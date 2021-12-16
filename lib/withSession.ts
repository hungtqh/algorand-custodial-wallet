import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiHandler } from "next";
import { User } from "types/user";

const ironOptions = {
  cookieName: "auth_algowallet",
  password: process.env.COOKIE_PRIVATE!,
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};

declare module "iron-session" {
  interface IronSessionData {
    user?: User;
  }
}

export function withSessionRoute(handler: NextApiHandler) {
  return withIronSessionApiRoute(handler, ironOptions);
}
