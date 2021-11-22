import { Context, Next } from "koa";
import { AppCtx } from "../interfaces/context.interface";

/** extra context middleware */

export default (conf: __Config__, kv: AppCtx["kv"], smtp: AppCtx["smtp"]) =>
  async (ctx: Context, next: Next) => {
    ctx.kv = kv;
    ctx.smtp = smtp;
    ctx.ts = Date.now();

    await next();

    if (!conf.__prod__) {
      Object.assign(ctx.body, {
        time: Date.now() - ctx.ts + "ms",
      });
    }
  };
