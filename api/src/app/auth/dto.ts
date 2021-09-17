import { Field, InputType } from "type-graphql";

@InputType()
export class AuthInputDto {
  @Field()
  usernameOrEmail!: string;
  @Field()
  password!: string;
}
