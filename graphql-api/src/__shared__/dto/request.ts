import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class PaginationDto {
  @Field()
  @IsNumber()
  @IsNotEmpty()
  limit!: number;

  @Field()
  @IsString()
  @IsOptional()
  cursor?: string;

  @Field()
  @IsString()
  @IsOptional()
  sorting?: string;
}