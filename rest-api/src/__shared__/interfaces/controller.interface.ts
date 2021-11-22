import Router from "@koa/router";

export interface IController {
  path: string;
  new (router: Router): void;
}
