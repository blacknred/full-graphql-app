import { Context } from "koa";
import Mail from "nodemailer/lib/mailer";
import { RedisClient } from "redis";

export type AppCtx = {
  kv: RedisClient;
  smtp: (mailOptions: Mail.Options) => Promise<any>;
  ctx: Context;
  ts?: number;
};
