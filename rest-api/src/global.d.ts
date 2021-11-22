import { opts } from "koa-session";
import { Configuration } from "log4js";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import { ClientOpts } from "redis";
import { BuildSchemaOptions } from "type-graphql";
import { ConnectionOptions } from "typeorm";

declare module "*.sql";

declare global {
  var NEW_GLOBAL: string;

  interface __Config__ {
    __port__: string | number;
    __prod__: boolean;
    __secret__: string;
    __clients__: Array<string> | undefined; // TODO: temp, use redis and nginx
    session: Partial<opts>;
    db: ConnectionOptions// Parameters<typeof createConnection>[0];
    redis: ClientOpts;
    email: SMTPTransport.Options;
    logger: Configuration;
    //
    cache: {
      onlineTimespan: string | number;
    };
  }
}
