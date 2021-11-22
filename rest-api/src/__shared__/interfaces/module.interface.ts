import Router from "@koa/router";

export type IModule = new (router: Router) => {};
