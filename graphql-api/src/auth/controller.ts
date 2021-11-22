import {
  Arg,
  Ctx,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root
} from "type-graphql";
import { AppCtx } from "../typings";
import { UserResponseDto } from "../users/dto";
import { User } from "../users/user.entity";
import { CreateAuthDto } from "./dto";
import { AuthService } from "./service";

@Resolver(User)
export class AuthController {
  private authService = new AuthService();

  @FieldResolver(() => String)
  email(@Root() user: User, @Ctx() { ctx }: AppCtx) {
    return ctx.session!.userId === user.id ? user.email : "";
  }

  @Mutation(() => UserResponseDto)
  async createAuth(
    @Arg("dto") dto: CreateAuthDto,
    @Ctx() { ctx }: AppCtx
  ): Promise<UserResponseDto> {
    return this.authService.create(ctx, dto);
  }

  @Query(() => User, { nullable: true })
  async getAuth(@Ctx() { ctx }: AppCtx): Promise<User | undefined> {
    return this.authService.findOne(ctx);
  }

  @Mutation(() => Boolean)
  deleteAuth(@Ctx() { ctx }: AppCtx): boolean {
    return this.authService.remove(ctx);
  }
}
