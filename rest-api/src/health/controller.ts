import Router from "@koa/router";
import { HealthService } from "./service";
import { HealthResponseDto } from "./dto";
import useAuth from "src/__shared__/middleware/auth.middleware";

export class HealthController {
  path = "/health";
  private heathService = new HealthService();

  constructor(router: Router) {
    router.get(this.path, useAuth, this.get);
  }

  async get(): Promise<HealthResponseDto> {
    return this.heathService.get();
  }
}
