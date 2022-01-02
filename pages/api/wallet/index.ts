import { NextApiRequest, NextApiResponse } from "next";
import { withSessionRoute } from "lib/withSession";
import prisma from "lib/prisma";
import { algorandGetAccountBalance } from "@tatumio/tatum";

export default withSessionRoute(walletsRoute);

async function walletsRoute(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case "GET":
      const user = req.session.user;

      if (!user) {
        return res.status(401).end("unauthorized");
      }

      const wallets = await prisma.wallet.findMany({
        where: { owner: { id: user.id } },
        select: {
          address: true,
          name: true,
          id: true,
          secret: false,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      //TODO: add proper types
      let walletsWithBalance = wallets.map(async (wallet: any) => {
        const balance = await algorandGetAccountBalance(wallet.address);
        wallet.balance = balance;
        return wallet;
      });

      walletsWithBalance = await Promise.all(walletsWithBalance);

      return res.status(200).send(walletsWithBalance);

      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} is not allowed`);
  }
}
