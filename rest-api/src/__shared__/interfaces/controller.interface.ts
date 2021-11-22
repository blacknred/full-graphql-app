import Router from "@koa/router";

interface Controller {
  path: string;
  router: Router;
}

export default Controller;
