import Router from "@koa/router";
import { AppCtx } from "src/__shared__/interfaces/context.interface";
import useAuth from "src/__shared__/middleware/auth.middleware";
import useValidation from "src/__shared__/middleware/validation.middleware";
import { CreateUserDto, UpdatePasswordDto, UserResponseDto } from "./dto";
import { UsersService } from "./service";

export class UsersController {
  path = "/users";
  private usersService = new UsersService();

  constructor(router: Router) {
    router.post(this.path, useValidation(CreateUserDto), this.create);
    router.post(`${this.path}/password`, useAuth, this.changePassword);
    router.patch(`${this.path}/password`, useAuth, this.updatePassword);
  }

  async create(ctx: AppCtx): Promise<UserResponseDto> {
    const dto = ctx.request.body as CreateUserDto;
    return this.usersService.create(ctx, dto);
  }

  async changePassword(ctx: AppCtx): Promise<UserResponseDto> {
    const email = ctx.request.body as string;
    return this.usersService.changePassword(ctx, email);
  }

  async updatePassword(ctx: AppCtx): Promise<UserResponseDto> {
    const dto = ctx.request.body as UpdatePasswordDto;
    return this.usersService.updatePassword(ctx, dto);
  }
}
