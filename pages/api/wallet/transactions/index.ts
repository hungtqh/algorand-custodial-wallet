import { withSessionRoute } from "lib/withSession";
import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import * as Yup from "yup";
import prisma from "lib/prisma";

const schema = Yup.object().shape({
  from: Yup.string().required("from is required"),
  to: Yup.string().required("to is required"),
  amount: Yup.number().required("amount is required"),
});

//TODO: find it on sdk
export default withSessionRoute(transactionRoute);

async function transactionRoute(req: NextApiRequest, res: NextApiResponse) {
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

      const data = await schema.validate(body);

      const fromWallet = await prisma.wallet.findFirst({
        where: { address: data.from, ownerId: user.id },
      });

      if (!fromWallet) {
        return res.status(403).send({ error: "wallet is not belongs to user" });
      }

      const amount = String(data.amount);

      try {
        const result = await axios.post(
          "https://api-eu1.tatum.io/v3/algorand/transaction",
          {
            from: fromWallet.address,
            to: data.to,
            amount: amount,
            fee: "0.001",
            fromPrivateKey: fromWallet.secret,
          },
          {
            headers: {
              "content-type": "application/json",
              "x-api-key": process.env.TATUM_API_KEY!,
            },
          }
        );
        return res.status(200).json(result.data);
      } catch (error) {
        console.error(error);
        if (error.response) {
          const data = error.response.data;
          return res.status(data.statusCode).json({ error: data.message });
        }
      }

      break;

    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} is not allowed`);
  }
}
