import { Field, InputType, ObjectType } from "type-graphql";
import { PaginatedResponseDto, ValidatedResponseDto } from "../../utils/sharedDto";
import { Post } from "./post.entity";

@InputType()
export class PostInputDto {
  @Field()
  title!: string;
  @Field()
  text!: string;
}

@ObjectType()
export class PostResponseDto extends ValidatedResponseDto(Post) {}

@ObjectType()
export class PostsResponseDto extends PaginatedResponseDto(Post) {}

@ObjectType()
export class VoteResponseDto extends ValidatedResponseDto(Number) {}
