import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class HealthResponseDto {
  @Field()
  status!: "OK" | "NOT OK";
  @Field()
  tz!: string;
  @Field()
  uptime!: string;
  @Field()
  activeConnections!: number;
}