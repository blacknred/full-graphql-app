import { plainToClass } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { Context, Next } from "koa";
import { FieldErrorDto } from "../dto/response";

/** validation middleware */

export default (type: any, skipMissingProperties = false) => {
  return async (ctx: Context, next: Next) => {
    const errors: ValidationError[] = await validate(
      plainToClass(type, ctx.body),
      {
        skipMissingProperties,
      }
    );

    if (errors.length > 0) {
      const messages = errors.reduce((all, error) => {
        if (error.constraints) {
          Object.keys(error.constraints).forEach((field) => {
            all.push({
              field,
              message: error.constraints![field]
            });
          });
        }
        return all;
      }, [] as FieldErrorDto[]);

      ctx.throw(400, messages);
    }

    await next();
  };
};
