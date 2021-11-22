import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";
import { ValidatedResponseDto } from "../__shared__/dto/response";
import { User } from "./entity";

export class CreateUserDto {
  @IsString()
  @MinLength(4)
  username!: string;

  @IsString()
  @MinLength(6)
  password!: string;

  @IsEmail()
  email!: string;
}

export class UpdatePasswordDto {
  @IsString()
  @IsNotEmpty()
  token!: string;

  @IsString()
  @MinLength(6)
  password!: string;
}

export class UserResponseDto extends ValidatedResponseDto<User> {}
