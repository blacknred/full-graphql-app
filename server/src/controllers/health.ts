import { Ctx, Field, ObjectType, Query, Resolver } from "type-graphql";
import server from "../index";
import { AppCtx } from "../typings";

@ObjectType()
class HealthResponse {
  @Field()
  status!: "OK" | "NOT OK";
  @Field()
  tz!: string;
  @Field()
  uptime!: string;
  @Field()
  activeConnections!: number;
}

@Resolver()
export class PingResolver {
  @Query(() => HealthResponse)
  async health(@Ctx() {}: AppCtx) {
    return {
      status: server.status,
      tz: server.timezome,
      uptime: `${server.uptime}s`,
      activeConnections: await server.countConnections(),
    };
  }
}
