import { NextApiRequest, NextApiResponse } from "next";
import prisma from "lib/prisma";
import bcrypt from "bcrypt";
import { withSessionRoute } from "lib/withSession";
import ChangePassword from "schema/ChangePassword";

type Data = {
  password: string;
  password_confirm: string;
};

export default withSessionRoute(loginRoute);

async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
  const {
    method,
    body,
    session: { user },
  } = req;

  switch (method) {
    case "POST":
      if (!user) {
        return res.status(401).end("unauthorized");
      }

      let data: Data;
      try {
        data = await ChangePassword.validate(body);
      } catch (error: any) {
        return res.status(406).send({ error: error.message });
      }

      const password = await bcrypt.hash(data.password, 10);

      await prisma.user.update({
        where: { id: user.id },
        data: {
          password,
        },
      });

      return res.status(200).json({ ok: true });

      break;

    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} is not allowed`);
  }
}
