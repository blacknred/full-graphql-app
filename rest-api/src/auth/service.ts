import crypt from "bcryptjs";
import { User } from "src/users/entity";
import { AppCtx } from "src/__shared__/interfaces/context.interface";
import { CreateAuthDto } from "./dto";

export class AuthService {
  async create(ctx: AppCtx, dto: CreateAuthDto) {
    const user = await User.findOne({
      where: [
        { username: dto.usernameOrEmail },
        { email: dto.usernameOrEmail },
      ],
    });

    if (!user) {
      const error = {
        field: "usernameOrEmail",
        message: "Such a user does not exist",
      };
      return { errors: [error] };
    }

    const valid = await crypt.compare(dto.password || "", user.password || "");

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

  async findOne(ctx: AppCtx) {
    if (!ctx.session!.userId) {
      return {};
    }

    const user = await User.findOne(+ctx.session!.userId);
    return { data: user };
  }

  remove(ctx: AppCtx) {
    ctx.session = null;
    return { data: null };
  }
}
