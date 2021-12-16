import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const saltRound = 5;

declare global {
  var prisma: PrismaClient | undefined;
}

const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV === "development") global.prisma = prisma;

const applyMiddleware = async (
  data: any,
  keyToModify: string,
  cb: (data: any) => void
) => {
  await Promise.all(
    Object.keys(data).map(async (key: string) => {
      if (keyToModify === key) {
        data[key] = await cb(data);
      }

      if (typeof data[key] === "object") {
        await applyMiddleware(data[key], keyToModify, cb);
      }
    })
  );
};

prisma.$use(async (params, next) => {
  switch (params.model) {
    case "User":
      switch (params.action) {
        case "upsert":
        case "create":
        case "createMany":
        case "update":
        case "updateMany":
          {
            await applyMiddleware(
              params.args.data,
              "password",
              async (data) => {
                const hashedPassword = await bcrypt.hash(
                  data.password,
                  saltRound
                );
                return hashedPassword;
              }
            );
          }
          break;
      }
      break;
  }

  return next(params);
});

export default prisma;
