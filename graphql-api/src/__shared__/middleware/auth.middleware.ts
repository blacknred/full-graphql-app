import { MiddlewareFn } from "type-graphql";
import { AppCtx } from "../interfaces/context.interface";

/** check auth */

const authMiddleware: MiddlewareFn<AppCtx> = async ({ context }, next) => {
  if (!context.ctx.session?.userId) {
    throw new Error("Not authenticated");
  }

  await next();
};

export default authMiddleware;
