import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "lib/prisma";
import { withSessionRoute } from "lib/withSession";
import UserRegister from "schema/UserRegister";

type Data = {
  username: string;
  password: string;
  password_confirm: string;
};

export default withSessionRoute(registrationRoute);

async function registrationRoute(req: NextApiRequest, res: NextApiResponse) {
  const { method, body } = req;

  switch (method) {
    case "POST":
      let data: Data;

      try {
        data = await UserRegister.validate(body);
      } catch (error: any) {
        return res.status(406).send({ error: error.message });
      }

      let user = await prisma.user.findFirst({
        where: { username: data.username },
      });

      if (user) {
        return res
          .status(409)
          .send({ error: "user with this username already exists" });
      }

      user = await prisma.user.create({
        data: {
          username: data.username,
          password: data.password,
        },
      });

      req.session.user = {
        id: user.id,
        isLoggedIn: true,
      };

      await req.session.save();

      return res.status(200).send(req.session.user);
      break;

    default:
      res.setHeader("allow", ["POST"]);
      res.status(405).end(`Method ${method} is not allowed`);
  }
}
