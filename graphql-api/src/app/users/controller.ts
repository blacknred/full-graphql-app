import {
  Arg,
  Ctx,
  FieldResolver,
  Mutation, Resolver,
  Root
} from "type-graphql";
import { AppCtx } from "../../typings";
import {
  NewPasswordInputDto,
  UserInputDto,
  UserResponseDto
} from "./dto";
import { User } from "./user.entity";
import { UsersService } from "./service";

@Resolver(User)
export class UserController {
  private usersService = new UsersService();

  @FieldResolver(() => String)
  email(@Root() user: User, @Ctx() { ctx }: AppCtx) {
    return ctx.session!.userId === user.id ? user.email : "";
  }

  @Mutation(() => UserResponseDto)
  async createUser(
    @Arg("options") options: UserInputDto,
    @Ctx() { ctx }: AppCtx
  ): Promise<UserResponseDto> {
    return this.usersService.create(ctx, options);
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
    @Arg("options") options: NewPasswordInputDto,
    @Ctx() ctx: AppCtx
  ): Promise<UserResponseDto> {
    return this.usersService.updatePassword(ctx, options);
  }
}
