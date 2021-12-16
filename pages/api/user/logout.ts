import { withSessionRoute } from "lib/withSession";
import type { NextApiRequest, NextApiResponse } from "next";

export default withSessionRoute(logoutRoute);

async function logoutRoute(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case "GET":
      req.session.destroy();
      res.send({ ok: true });
  }
}
