import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class PaginationDto {
  @IsNumber()
  @IsNotEmpty()
  limit!: number;

  @IsString()
  @IsOptional()
  cursor?: string;

  @IsString()
  @IsOptional()
  sorting?: string;
}
