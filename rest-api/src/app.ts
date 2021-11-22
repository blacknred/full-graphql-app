import * as http from "http";
import Koa from "koa";
import bodyParser from "koa-body";
import Router from "@koa/router";
import cors from "koa-cors";
import helmet from "koa-helmet";
import session from "koa-session";
import log4js, { Logger } from "log4js";
import * as nodemailer from "nodemailer";
import { Transporter } from "nodemailer";
import { ServerInfo } from "redis";
import "reflect-metadata";
import { Connection, createConnection } from "typeorm";
import useCors from "./__shared__/middleware/cors.middleware";
import useErrors from "./__shared__/middleware/error.middleware";
import { Redis, RedisClient, RedisSession } from "./__shared__/utils/redis";
import { IModule } from "./__shared__/interfaces/module.interface";

/** set all up */

export default class App {
  ref?: http.Server;
  startsAt = Date.now();
  logger: Logger;
  orm?: Connection;
  private redis?: RedisClient;
  private smtp?: Transporter;

  constructor(conf: __Config__, modules: ReadonlyArray<IModule>) {
    /** logger */
    log4js.configure(conf.logger);
    this.logger = log4js.getLogger("server");

    /** handle unhandledRejection */
    process.on("unhandledRejection", (reason: any, promise: any) => {
      this.logger.warn(reason, promise);
    });

    /** handle uncaughtException */
    process.on("uncaughtException", this.stop.bind(this));

    /** handle shutdown signal */
    process.on("SIGINT", this.stop.bind(this));

    /** run */
    this.start(conf, modules);
  }

  /** server health status */

  get status(): "OK" | "NOT OK" {
    return "OK";
  }

  /** server timezone */

  get timezome(): string {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  }

  /** server uptime */

  get uptime(): number {
    return Math.floor((Date.now() - this.startsAt) / 1000);
  }

  /** redis statistic */

  get redisStat(): ServerInfo | undefined {
    return this.redis?.server_info;
  }

  /** count active connections */

  async countConnections(): Promise<number> {
    return new Promise((res) => {
      if (!this.ref) return res(0);
      this.ref.getConnections((_, activeConnections: number) => {
        res(activeConnections);
      });
    });
  }

  /** run */

  private async start(conf: __Config__, modules: ReadonlyArray<IModule>) {
    try {
      /** redis instance */
      this.redis = new Redis(conf.redis);
      this.redis.on("error", this.stop.bind(this));

      /** db connection */
      // conf.db.logger = this.logger.info;
      this.orm = await createConnection(conf.db);
      if (!this.orm.isConnected) {
        throw new Error("ORM is not connected");
      }
      await this.orm.runMigrations();

      /** smtp instance */
      if (!conf.__prod__ && !conf.email.url) {
        const { user, pass, smtp } = await nodemailer.createTestAccount();
        conf.email.url = `smtp://${user}:${pass}@${smtp.host}:${smtp.port}`;
        this.logger.warn("new test smtp url is " + conf.email.url);
      }
      this.smtp = nodemailer.createTransport(conf.email);
      if (!(await this.smtp.verify())) {
        throw new Error("Smtp is not connected");
      }

      /** check redis connection */
      if (!this.redis!.connected) {
        throw new Error("Redis is not connected");
      }

      /** application */
      const app = new Koa();
      app.use(cors(useCors(conf.__clients__)));
      conf.session.store = new RedisSession(this.redis);
      app.use(session(conf.session, app));
      app.use(bodyParser());
      app.use(helmet());
      app.use(useErrors);
      //

      /** routes */
      const router = new Router();
      modules.forEach((Module) => new Module(router));
      app.use(router.routes());

      /** listen */
      this.ref = await app.listen(conf.__port__);
      this.logger.info(`🚀 at http://127.0.0.1:${conf.__port__}`);
    } catch (err) {
      console.log(err);

      this.stop(err);
    }
  }

  /** shutdown */

  async stop(err?: Error) {
    const count = await this.countConnections();
    const postlog = `[pending requests: ${count}, app is shutting down...]`;
    this.logger.fatal(err?.message || "", postlog);

    // By default PM2 will wait 1600ms before sending a final SIGKILL signal.
    await this.orm?.close();
    this.smtp?.close(); // has also idle event to queue unsent emails in redis
    log4js.shutdown();
    this.redis?.quit((err) => {
      process.exit(err ? 1 : 0);
    });
  }
}
