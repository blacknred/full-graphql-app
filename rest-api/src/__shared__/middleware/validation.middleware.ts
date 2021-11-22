import { plainToClass } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { Context, Next } from "koa";
import HttpException from "../exceptions/HttpException";

export default (type: any, skipMissingProperties = false) => {
  return async ({ body }: Context, next: Next) => {
    const errors: ValidationError[] = await validate(plainToClass(type, body), {
      skipMissingProperties,
    });

    if (errors.length > 0) {
      const message = errors.reduce((str, error) => {
        if (error.constraints) {
          str += `, ${Object.values(error.constraints)}`;
        }
        return str;
      }, "");

      throw new HttpException(400, message);
    }

    await next();
  };
};
