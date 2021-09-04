import {
  Arg,
  Ctx,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root
} from "type-graphql";
import { AppCtx } from "../../typings";
import {
  LoginInputDto,
  NewPasswordInputDto,
  RegisterInputDto,
  UserResponseDto
} from "./dto";
import { User } from "./entity";
import { UsersService } from "./service";

@Resolver(User)
export class UserController {
  private usersService = new UsersService();

  @FieldResolver(() => String)
  email(@Root() user: User, @Ctx() { ctx }: AppCtx) {
    return ctx.session!.userId === user.id ? user.email : "";
  }

  @Query(() => User, { nullable: true })
  async me(@Ctx() { ctx }: AppCtx): Promise<User | undefined> {
    return this.usersService.findMe(ctx);
  }

  @Mutation(() => UserResponseDto)
  async register(
    @Arg("options") options: RegisterInputDto,
    @Ctx() { ctx }: AppCtx
  ): Promise<UserResponseDto> {
    return this.usersService.createUser(ctx, options);
  }

  @Mutation(() => UserResponseDto)
  async login(
    @Arg("options") options: LoginInputDto,
    @Ctx() { ctx }: AppCtx
  ): Promise<UserResponseDto> {
    return this.usersService.loginUser(ctx, options);
  }

  @Mutation(() => Boolean)
  logout(@Ctx() { ctx }: AppCtx): boolean {
    return this.usersService.logoutUser(ctx);
  }

  @Mutation(() => UserResponseDto)
  async forgotPassword(
    @Arg("email") email: string,
    @Ctx() ctx: AppCtx
  ): Promise<UserResponseDto> {
    return this.usersService.forgotPassword(ctx, email);
  }

  @Mutation(() => UserResponseDto)
  async changePassword(
    @Arg("options") options: NewPasswordInputDto,
    @Ctx() ctx: AppCtx
  ): Promise<UserResponseDto> {
    return this.usersService.updatePassword(ctx, options);
  }
}
