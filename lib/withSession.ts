import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiHandler } from "next";

const ironOptions = {
  cookieName: "auth_algowallet",
  password: process.env.COOKIE_PRIVATE!,
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};

declare module "iron-session" {
  interface IronSessionData {
    user?: {
      id: number;
    };
  }
}

export function withSessionRoute(handler: NextApiHandler) {
  return withIronSessionApiRoute(handler, ironOptions);
}
