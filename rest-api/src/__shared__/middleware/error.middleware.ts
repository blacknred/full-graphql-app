import { NextFunction, Request, Response } from 'express';
import { Context, Next } from 'koa';
import HttpException from '../exceptions/HttpException';

function errorMiddleware(ctx: Context, next: Next) {
  const status = error.status || 500;
  const message = error.message || 'Something went wrong';
  response
    .status(status)
    .send({
      message,
      status,
    });
}

export default errorMiddleware;
