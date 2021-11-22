import { Context, Next } from "koa";

/** error middleware */

export default async (ctx: Context, next: Next) => {
  try {
    await next();
  } catch (err) {
    const status = err.status || 500;
    const message = err.message || "Something went wrong";

    ctx.status = status;
    ctx.body = { status, errors: message };
    // ctx.app.emit('error', err, ctx);
  }
};
