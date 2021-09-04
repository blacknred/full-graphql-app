import { Field, InputType, ObjectType } from "type-graphql";
import { ValidatedResponseDto } from "../../utils/sharedDto";
import { User } from "./entity";

@InputType()
export class RegisterInputDto {
  @Field()
  username!: string;
  @Field()
  password!: string;
  @Field()
  email!: string;
}

@InputType()
export class LoginInputDto {
  @Field()
  usernameOrEmail!: string;
  @Field()
  password!: string;
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
