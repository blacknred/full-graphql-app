import { Context, Next } from "koa";
import graphqlHTTP from "koa-graphql";
import { buildSchema } from "type-graphql";
import { AppCtx } from "../typings";

/** build http graphql middleware */

export default (conf: __Config__, kv: AppCtx["kv"], smtp: AppCtx["smtp"]) =>
  async (ctx: Context, next: Next) => {
    const schema: graphqlHTTP.Options = {
      graphiql: conf.graphiql,
      schema: await buildSchema(conf.graphql),
      context: { ctx, kv, smtp, ts: Date.now() },
    };

    if (!conf.__prod__) {
      schema.extensions = (opt: any) => ({
        time: Date.now() - opt.context.ts + "ms",
      });
    }

    return graphqlHTTP(schema)(ctx, next);
  };
