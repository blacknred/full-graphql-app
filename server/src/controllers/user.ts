import argon2 from "argon2";
import {
  Arg,
  Ctx,
  Field,
  FieldResolver,
  InputType,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  Root
} from "type-graphql";
import { v4 } from "uuid";
import templates from "../mailTemplates";
import { User } from "../models/User";
import { AppCtx } from "../typings";
import { inputValidation } from "../utils";
import { FieldError, ValidatedResponse } from "./_fragments";

@InputType()
class RegisterInput {
  @Field()
  username!: string;
  @Field()
  password!: string;
  @Field()
  email!: string;
}

@InputType()
class LoginInput {
  @Field()
  usernameOrEmail!: string;
  @Field()
  password!: string;
}

@InputType()
class NewPasswordInput {
  @Field()
  token!: string;
  @Field()
  password!: string;
}

@ObjectType()
class UserResponse extends ValidatedResponse(User) {}

@Resolver(User)
export class UserResolver {
  @FieldResolver(() => String)
  email(@Root() user: User, @Ctx() { ctx }: AppCtx) {
    return ctx.session!.userId === user.id ? user.email : "";
  }

  @Query(() => User, { nullable: true })
  async me(@Ctx() { ctx }: AppCtx): Promise<User | undefined> {
    if (!ctx.session!.userId) return undefined;
    return User.findOne(+ctx.session!.userId);
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg("options") options: RegisterInput,
    @Ctx() { ctx }: AppCtx
  ): Promise<UserResponse> {
    const errors = inputValidation<RegisterInput, FieldError>(options);
    if (errors) return { errors };

    if (await User.findOne({ username: options.username })) {
      const error = {
        field: "username",
        message: "Such a user already exists",
      };
      return { errors: [error] };
    }

    options.password = await argon2.hash(options.password);
    const user = await User.create(options).save();
    ctx.session!.userId = user.id;
    return { data: user };
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg("options") options: LoginInput,
    @Ctx() { ctx }: AppCtx
  ): Promise<UserResponse> {
    const errors = inputValidation<LoginInput, FieldError>(options);
    if (errors) return { errors };

    const user = await User.findOne({
      where: [
        { username: options.usernameOrEmail },
        { email: options.usernameOrEmail },
      ],
    });

    if (!user) {
      const error = {
        field: "usernameOrEmail",
        message: "Such a user does not exist",
      };
      return { errors: [error] };
    }

    const valid = await argon2.verify(
      user.password || "",
      options.password || ""
    );

    if (!valid) {
      const error = {
        field: "password",
        message: "Incorrect password",
      };
      return { errors: [error] };
    }

    ctx.session!.userId = user.id;
    return { data: user };
  }

  @Mutation(() => Boolean)
  logout(@Ctx() { ctx }: AppCtx): boolean {
    ctx.session = null;
    return true;
  }

  @Mutation(() => UserResponse)
  async forgotPassword(
    @Arg("email") email: string,
    @Ctx() { ctx, kv, smtp }: AppCtx
  ): Promise<UserResponse> {
    const errors = inputValidation<{ email: typeof email }, FieldError>({
      email,
    });
    if (errors) return { errors };

    const user = await User.findOne({ where: { email } });
    if (!user) {
      const error = {
        field: "email",
        message: "Such a email is not in use",
      };
      return { errors: [error] };
    }

    const token = v4();
    await kv.set(`CHANGE-PASSWORD:${token}`, `${user.id}`, "ex", 60 * 60);
    const html = templates.forgotPassword(ctx.request.header.origin!, token);
    await smtp({ to: email, subject: "Change password", html });
    return {};
  }

  @Mutation(() => UserResponse)
  async changePassword(
    @Arg("options") options: NewPasswordInput,
    @Ctx() { kv, smtp }: AppCtx
  ): Promise<UserResponse> {
    const errors = inputValidation<NewPasswordInput, FieldError>(options);
    if (errors) return { errors };

    const userId = await kv.get(`CHANGE-PASSWORD:${options.token}`);
    if (!userId) {
      const error = {
        field: "token",
        message: "Token is invalid or expired. Try again.",
      };
      return { errors: [error] };
    }

    const user = await User.findOne(+userId);
    if (!user) {
      const error = {
        field: "token",
        message: "Such a user does not exist",
      };
      return { errors: [error] };
    }

    user.password = await argon2.hash(options.password);
    await User.update(+userId, user);
    const html = templates.changedPassword();
    await smtp({ to: user.email, subject: "Password changed", html });
    await kv.del(`CHANGE-PASSWORD:${options.token}`);
    return {};
  }
}
