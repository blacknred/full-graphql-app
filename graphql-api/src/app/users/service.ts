import crypt from "bcryptjs";
import { v4 } from "uuid";
import { AppCtx } from "../../typings";
import inputValidation from "../../utils/inputValidation";
import emails from "../../utils/mailTemplates";
import { FieldErrorDto } from "../__shared__/dto/response";
import { NewPasswordInputDto, UserInputDto } from "./dto";
import { User } from "./user.entity";

export class UsersService {
  async create(ctx: AppCtx["ctx"], options: UserInputDto) {
    const errors = inputValidation<UserInputDto, FieldErrorDto>(options);
    if (errors) return { errors };

    if (await User.findOne({ username: options.username })) {
      const error = {
        field: "username",
        message: "Such a user already exists",
      };
      return { errors: [error] };
    }

    options.password = crypt.hashSync(options.password);
    const user = await User.create(options).save();
    ctx.session!.userId = user.id;
    return { data: user };
  }

  async changePassword({ kv, smtp, ctx }: AppCtx, email: string) {
    const errors = inputValidation<{ email: typeof email }, FieldErrorDto>({
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
    const html = emails.forgotPassword(ctx.request.header.origin!, token);
    await smtp({ to: email, subject: "Change password", html });
    return {};
  }

  async updatePassword({ kv, smtp }: AppCtx, options: NewPasswordInputDto) {
    const errors = inputValidation<NewPasswordInputDto, FieldErrorDto>(options);
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

    user.password = crypt.hashSync(options.password);
    await User.update(+userId, user);
    const html = emails.changedPassword();
    await smtp({ to: user.email, subject: "Password changed", html });
    await kv.del(`CHANGE-PASSWORD:${options.token}`);
    return {};
  }
}
