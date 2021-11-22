import { ClassType, Field, ObjectType } from "type-graphql";

@ObjectType()
export class FieldErrorDto {
  @Field()
  field!: string;
  @Field()
  message!: string;
}

export function PaginatedResponseDto<T>(
  TValue: ClassType<T> | String | Number | Boolean
): any {
  @ObjectType({ isAbstract: true })
  abstract class PaginatedResponseClass {
    @Field(() => [TValue])
    items!: T[];
    @Field()
    hasMore!: boolean;
    // @Field(type => Int)
    // total: number;
  }

  return PaginatedResponseClass;
}

export function ValidatedResponseDto<T>(
  TValue: ClassType<T> | String | Number | Boolean
): any {
  @ObjectType({ isAbstract: true })
  abstract class ValidatedResponseClass {
    @Field(() => [FieldErrorDto], { nullable: true })
    errors?: FieldErrorDto[];
    @Field(() => TValue, { nullable: true })
    data?: T;
  }

  return ValidatedResponseClass;
}
