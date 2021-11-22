import {
  Arg,
  Ctx,
  FieldResolver,
  Mutation,
  Resolver,
  Root,
} from "type-graphql";
import { AppCtx } from "../__shared__/interfaces/context.interface";
import { CreateUserDto, UpdatePasswordDto, UserResponseDto } from "./dto";
import { UsersService } from "./service";
import { User } from "./entity";

@Resolver(User)
export class UsersController {
  private usersService = new UsersService();

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
