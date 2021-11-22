import Router from "@koa/router";
import { Context } from "koa";
import useAuth from "src/__shared__/middleware/auth.middleware";
import useValidation from "src/__shared__/middleware/validation.middleware";
import { IController } from "../__shared__/interfaces/controller.interface";
import { CreateUserDto, UpdatePasswordDto, UserResponseDto } from "./dto";
import { UsersService } from "./service";

export class UsersController implements IController {
  path = "/users";

  constructor(router: Router, private usersService: UsersService) {
    router.post(`${this.path}`, useValidation(CreateUserDto), this.createUser);
    router.post(`${this.path}/password`, useAuth, this.changePassword);
    router.patch(`${this.path}/password`, useAuth, this.updatePassword);
  }

  async createUser(ctx: Context): Promise<UserResponseDto> {
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
