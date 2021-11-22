import { IsIn, IsNotEmpty, IsNumber } from "class-validator";
import { ValidatedResponseDto } from "src/__shared__/dto/response";

export class CreateVoteDto {
  @IsNumber()
  @IsNotEmpty()
  postId: number;

  @IsIn([1, -1])
  value: 1 | -1;
}

export class VoteResponseDto extends ValidatedResponseDto<number> {}
