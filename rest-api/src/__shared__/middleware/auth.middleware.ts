import { Context, Next } from "koa";

/** check auth */

export default async (ctx: Context, next: Next) => {
  if (!ctx.session?.userId) {
    ctx.throw(401, "Not authenticated");
  }

  await next();
};
