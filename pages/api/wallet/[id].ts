import { withSessionRoute } from "lib/withSession";
import { NextApiRequest, NextApiResponse } from "next";
import { algorandGetAccountBalance } from "@tatumio/tatum";
import prisma from "lib/prisma";

export default withSessionRoute(walletInfoRoute);

async function walletInfoRoute(req: NextApiRequest, res: NextApiResponse) {
  const {
    method,
    query: { id },
    session: { user },
  } = req;

  switch (method) {
    case "GET":
      // if (!user) {
      //   return res.status(401).end("unauthorized");
      // }

      const wallet = await prisma.wallet.findUnique({
        where: { id: id as string },
      });

      if (!wallet) {
        return res.status(404).send({ error: "wallet not found" });
      }

      const balance = await algorandGetAccountBalance(wallet.address);

      const response = {
        id: wallet.id,
        address: wallet.address,
        name: wallet.name,
        balance: Number(balance),
      };

      return res.status(200).send(response);
      break;

    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} is not allowed`);
  }
}
