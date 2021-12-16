import { NextApiRequest, NextApiResponse } from "next";
import prisma from "lib/prisma";
import Joi from "joi";
import bcrypt from "bcrypt";
import { withSessionRoute } from "lib/withSession";

type Data = {
  username: string;
  password: string;
};

const schema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

export default withSessionRoute(loginRoute);

async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
  const { method, body } = req;

  switch (method) {
    case "POST":
      const errorMessage = "username or password is incorrect";
      let data: Data;
      try {
        data = await schema.validateAsync(body);
      } catch (error: any) {
        return res.status(406).send({ error: error.message });
      }

      const user = await prisma.user.findFirst({
        where: { username: data.username },
      });
      if (!user) {
        return res.status(403).send({ error: errorMessage });
      }

      const isPasswordCorrect = await bcrypt.compare(
        data.password,
        user.password
      );

      if (isPasswordCorrect) {
        req.session.user = {
          id: user.id,
        };

        return res.status(200).send({ ok: true });
      } else {
        return res.status(403).send({ error: errorMessage });
      }

      break;

    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} is not allowed`);
  }
}
