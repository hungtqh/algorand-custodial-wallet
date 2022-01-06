import { withSessionRoute } from "lib/withSession";
import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default withSessionRoute(getTransactionsRoute);

async function getTransactionsRoute(req: NextApiRequest, res: NextApiResponse) {
  const {
    method,
    query,
    session: { user },
  } = req;

  switch (method) {
    case "GET":
      if (!user) {
        return res.status(401).end("unauthorized");
      }
      const url = `https://api-eu1.tatum.io/v3/algorand/node/indexer/${process.env.TATUM_API_KEY}/v2/accounts/${query.address}/transactions`;

      try {
        const result = await axios.get(url, {
          headers: {
            "x-api-key": process.env.TATUM_API_KEY!,
          },
        });

        return res.status(200).json(result.data);
      } catch (error: any) {
        console.error(error);
        if (error.response) {
          const data = error.response.data;
          return res.status(data.statusCode).json({ error: data.message });
        }
      }

      break;

    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} is not allowed`);
  }
}
