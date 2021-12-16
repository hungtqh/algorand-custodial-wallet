import { withSessionRoute } from "lib/withSession";
import type { NextApiRequest, NextApiResponse } from "next";

export default withSessionRoute(userRoute);

async function userRoute(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case "GET":
      if (req.session.user) {
        return res.status(200).json({
          ...req.session.user,
          isLoggedIn: true,
        });
      }
      return res.status(200).json({
        isLoggedIn: false,
      });
      break;

    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} is not allowed`);
  }
}
