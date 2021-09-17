import { Field, InputType, ObjectType } from "type-graphql";
import { ValidatedResponseDto } from "../../utils/sharedDto";
import { User } from "./user.entity";

@InputType()
export class UserInputDto {
  @Field()
  username!: string;
  @Field()
  password!: string;
  @Field()
  email!: string;
}

@InputType()
export class NewPasswordInputDto {
  @Field()
  token!: string;
  @Field()
  password!: string;
}

@ObjectType()
export class UserResponseDto extends ValidatedResponseDto(User) {}
