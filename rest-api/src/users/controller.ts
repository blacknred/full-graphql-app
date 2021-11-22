import Router from "@koa/router";
import { Context } from "koa";
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

  async create(ctx: Context): Promise<UserResponseDto> {
    const dto = ctx.body as CreateUserDto;
    return this.usersService.create(ctx, dto);
  }

  async changePassword(ctx: Context): Promise<UserResponseDto> {
    const email = ctx.body as string;
    return this.usersService.changePassword(ctx, email);
  }

  async updatePassword(ctx: Context): Promise<UserResponseDto> {
    const dto = ctx.body as UpdatePasswordDto;
    return this.usersService.updatePassword(ctx, dto);
  }
}
