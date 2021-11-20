import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";
import { Field, InputType, ObjectType } from "type-graphql";
import { ValidatedResponseDto } from "../__shared__/dto/response";
import { User } from "./user.entity";

@InputType()
export class CreateUserDto {
  @Field()
  @IsString()
  @MinLength(4)
  username!: string;

  @Field()
  @IsString()
  @MinLength(6)
  password!: string;

  @Field()
  @IsEmail()
  email!: string;
}

@InputType()
export class UpdatePasswordDto {
  @Field()
  @IsString()
  @IsNotEmpty()
  token!: string;

  @Field()
  @IsString()
  @MinLength(6)
  password!: string;
}

@ObjectType()
export class UserResponseDto extends ValidatedResponseDto(User) {}
