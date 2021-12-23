import { NextApiRequest, NextApiResponse } from "next";
import { withSessionRoute } from "lib/withSession";
import { generateAlgoWallet } from "@tatumio/tatum";
import prisma from "lib/prisma";

export default withSessionRoute(newWalletRoute);

async function newWalletRoute(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case "POST":
      const user = req.session.user;
      if (!user) {
        return res.status(403).end("unauthorized");
      }
      const wallet = await generateAlgoWallet();

      await prisma.wallet.create({
        data: {
          address: wallet.address,
          secret: wallet.secret,
          ownerId: user.id,
        },
      });

      return res.status(200).send({ ok: true });

      break;
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} is not allowed`);
  }
}
