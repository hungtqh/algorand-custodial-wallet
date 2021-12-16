import { withSessionRoute } from "lib/withSession";
import type { NextApiRequest, NextApiResponse } from "next";

export default withSessionRoute(userRoute);

async function userRoute(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case "GET":
      const user = req.session.user;
      res.send({ user });

    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} is not allowed`);
  }
}
