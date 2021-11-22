import { Context, Next } from "koa";

/** check auth */

export default async (ctx: Context, next: Next) => {
  if (!ctx.session?.userId) {
    throw new Error("Not authenticated");
  }

  await next();
};
