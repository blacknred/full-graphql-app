import { IsNotEmpty, IsString } from "class-validator";
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

export class PostResponseDto extends ValidatedResponseDto<Post> {}

export class PostsResponseDto extends PaginatedResponseDto<Post> {}
