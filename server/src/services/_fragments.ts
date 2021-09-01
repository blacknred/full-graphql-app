import { Field, ObjectType, ClassType, InputType } from "type-graphql";

@ObjectType()
export class FieldError {
  @Field()
  field!: string;
  @Field()
  message!: string;
}

@InputType()
export class PaginatedInput {
  @Field()
  limit!: number;
  @Field()
  cursor?: string;
  @Field()
  sorting?: string;
}

export function PaginatedResponse<T>(TValue: ClassType<T> | String | Number | Boolean): any {
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

export function ValidatedResponse<T>(TValue: ClassType<T> | String | Number | Boolean): any {
  @ObjectType({ isAbstract: true })
  abstract class ValidatedResponseClass {
    @Field(() => [FieldError], { nullable: true })
    errors?: FieldError[];
    @Field(() => TValue, { nullable: true })
    data?: T;
  }

  return ValidatedResponseClass;
}
