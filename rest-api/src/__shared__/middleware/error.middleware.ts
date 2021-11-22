import { Context, Next } from "koa";


export default async (ctx: Context, next: Next) => {
  try {
    await next();
  } catch (err) {
    const status = err.status || 500;
    ctx.status = status;
    ctx.body = {
      status,
      message: err.message || "Something went wrong";
    }
    // ctx.app.emit('error', err, ctx);
  }
};
