import crypt from "bcryptjs";
import { AppCtx } from "../../typings";
import { User } from "../users/user.entity";
import { CreateAuthDto } from "./dto";

export class AuthService {
  async create(ctx: AppCtx["ctx"], dto: CreateAuthDto) {
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

    const valid = await crypt.compare(
      dto.password || "",
      user.password || ""
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

  async findOne(ctx: AppCtx["ctx"]) {
    if (!ctx.session!.userId) return undefined;
    return User.findOne(+ctx.session!.userId);
  }

  remove(ctx: AppCtx["ctx"]) {
    ctx.session = null;
    return true;
  }
}
