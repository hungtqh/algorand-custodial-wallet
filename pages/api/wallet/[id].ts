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
    body,
  } = req;

  switch (method) {
    case "GET": {
      if (!user) {
        return res.status(401).end("unauthorized");
      }

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
    }

    case "DELETE": {
      if (!user) {
        return res.status(401).end("unauthorized");
      }

      const wallet = await prisma.wallet.findFirst({
        where: { id: id as string, ownerId: user.id },
      });

      if (!wallet) {
        return res
          .status(404)
          .send({ error: "wallet does not belongs to user" });
      }

      await prisma.wallet.delete({
        where: { id: wallet.id },
      });

      return res.status(200).json({ ok: true });

      break;
    }

    case "PUT": {
      if (!user) {
        return res.status(401).end("unauthorized");
      }

      const wallet = await prisma.wallet.findFirst({
        where: { id: id as string, ownerId: user.id },
      });

      if (!wallet) {
        return res
          .status(404)
          .send({ error: "wallet does not belongs to user" });
      }

      const newName: string = body.name;
      const rest = await prisma.wallet.update({
        where: {
          id: wallet.id,
        },
        data: {
          name: newName,
        },
      });

      return res.status(200).json({ ok: true });
    }
    default:
      res.setHeader("Allow", ["GET", "DELETE", "PUT"]);
      res.status(405).end(`Method ${method} is not allowed`);
  }
}
