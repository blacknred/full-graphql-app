
import Router from "@koa/router";
import { AppCtx } from "../../typings";
import Controller from "../../__shared__/interfaces/controller.interface";
import { CreateUserDto, UpdatePasswordDto, UserResponseDto } from "./dto";
import { UsersService } from "./service";
import { User } from "./user.entity";

export class UsersController implements Controller {
  public path = '/users';
  public router = new Router();
  private usersService = new UsersService();

  constructor() {
    this.router.get(`${this.path}/:id`, authMiddleware, this.getUserById);
    this.router.get(`${this.path}/:id/posts`, authMiddleware, this.getAllPostsOfUser);
  }

  @FieldResolver(() => String)
  email(@Root() user: User, @Ctx() { ctx }: AppCtx) {
    return ctx.session!.userId === user.id ? user.email : "";
  }

  @Mutation(() => UserResponseDto)
  async createUser(
    @Arg("dto") dto: CreateUserDto,
    @Ctx() { ctx }: AppCtx
  ): Promise<UserResponseDto> {
    return this.usersService.create(ctx, dto);
  }

  @Mutation(() => UserResponseDto)
  async changePassword(
    @Arg("email") email: string,
    @Ctx() ctx: AppCtx
  ): Promise<UserResponseDto> {
    return this.usersService.changePassword(ctx, email);
  }

  @Mutation(() => UserResponseDto)
  async updatePassword(
    @Arg("dto") dto: UpdatePasswordDto,
    @Ctx() ctx: AppCtx
  ): Promise<UserResponseDto> {
    return this.usersService.updatePassword(ctx, dto);
  }
}
