export class FieldErrorDto {
  field!: string;
  message!: string;
}

export class PaginatedResponseDto<T> {
  items!: T[];
  hasMore!: boolean;
  // @Field(type => Int)
  // total: number;
}

export class ValidatedResponseDto<T> {
  errors?: FieldErrorDto[];
  data?: T;
}

export class EmptyResponseDto extends ValidatedResponseDto<null> {}
