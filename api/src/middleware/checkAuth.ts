import { AppCtx } from "src/typings";
import { MiddlewareFn } from "type-graphql";

/** check auth */

const checkAuth: MiddlewareFn<AppCtx> = async ({ context }, next) => {
  if (!context.ctx.session?.userId) {
    throw new Error("Not authenticated");
  }

  await next();
};

export default checkAuth;
