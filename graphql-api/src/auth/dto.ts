import { IsNotEmpty, IsString, MinLength } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class CreateAuthDto {
  @Field()
  @IsString()
  @IsNotEmpty()
  usernameOrEmail!: string;

  @Field()
  @IsString()
  @MinLength(6)
  password!: string;
}
