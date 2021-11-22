import { IsIn, IsNotEmpty, IsNumber } from "class-validator";
import { Field, InputType, ObjectType } from "type-graphql";
import { ValidatedResponseDto } from "../../__shared__/dto/response";

@InputType()
export class CreateVoteDto {
  @Field()
  @IsNumber()
  @IsNotEmpty()
  postId: number;

  @Field()
  @IsIn([1, -1])
  value: 1 | -1;
}

@ObjectType()
export class VoteResponseDto extends ValidatedResponseDto(Number) {}
