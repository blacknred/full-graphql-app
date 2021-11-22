import { Context, Next } from "koa";
import graphqlHTTP from "koa-graphql";
import { buildSchema, NonEmptyArray } from "type-graphql";
import { IModule } from "../interfaces/module.interface";
import { AppCtx } from "../interfaces/context.interface";

/** build http graphql middleware */

export default (
    conf: __Config__,
    resolvers: NonEmptyArray<IModule>,
    kv: AppCtx["kv"],
    smtp: AppCtx["smtp"]
  ) =>
  async (ctx: Context, next: Next) => {
    conf.graphql.resolvers = resolvers;

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
