import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Field, InputType, ObjectType } from "type-graphql";
import {
  PaginatedResponseDto,
  ValidatedResponseDto,
} from "../__shared__/dto/response";
import { Post } from "./post.entity";

@InputType()
export class CreatePostDto {
  @Field()
  @IsString()
  @IsNotEmpty()
  title!: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  text!: string;
}

@InputType()
export class UpdatePostDto extends CreatePostDto {
  @Field()
  @IsNumber()
  @IsNotEmpty()
  id!: number;
}

@ObjectType()
export class PostResponseDto extends ValidatedResponseDto(Post) {}

@ObjectType()
export class PostsResponseDto extends PaginatedResponseDto(Post) {}
