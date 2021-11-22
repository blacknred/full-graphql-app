import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateAuthDto {
  @IsString()
  @IsNotEmpty()
  usernameOrEmail!: string;

  @IsString()
  @MinLength(6)
  password!: string;
}
