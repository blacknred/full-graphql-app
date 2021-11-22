import crypt from "bcryptjs";
import { v4 } from "uuid";
import { AppCtx } from "../typings";
import emails from "../__shared__/utils/mailTemplates";
import { CreateUserDto, UpdatePasswordDto } from "./dto";
import { User } from "./entity";

export class UsersService {
  async create(ctx: AppCtx["ctx"], dto: CreateUserDto) {
    if (await User.findOne({ username: dto.username })) {
      const error = {
        field: "username",
        message: "Such a user already exists",
      };
      return { errors: [error] };
    }

    dto.password = crypt.hashSync(dto.password);
    const user = await User.create(dto).save();
    ctx.session!.userId = user.id;
    return { data: user };
  }

  async changePassword({ kv, smtp, ctx }: AppCtx, email: string) {
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

  async updatePassword({ kv, smtp }: AppCtx, dto: UpdatePasswordDto) {
    const userId = await kv.get(`CHANGE-PASSWORD:${dto.token}`);
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

    user.password = crypt.hashSync(dto.password);
    await User.update(+userId, user);
    const html = emails.changedPassword();
    await smtp({ to: user.email, subject: "Password changed", html });
    await kv.del(`CHANGE-PASSWORD:${dto.token}`);
    return {};
  }
}
