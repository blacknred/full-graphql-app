import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import {
  PaginatedResponseDto,
  ValidatedResponseDto,
} from "../__shared__/dto/response";
import { Post } from "./entity";

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  text!: string;
}

export class UpdatePostDto extends CreatePostDto {
  @IsNumber()
  @IsNotEmpty()
  id!: number;
}

export class PostResponseDto extends ValidatedResponseDto<Post> {}

export class PostsResponseDto extends PaginatedResponseDto<Post> {}
