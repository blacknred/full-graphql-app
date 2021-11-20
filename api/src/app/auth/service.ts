import crypt from "bcryptjs";
import { AppCtx } from "../../typings";
import inputValidation from "../../utils/inputValidation";
import { FieldErrorDto } from "../__shared__/dto/response";
import { AuthInputDto } from "./dto";
import { User } from "../users/user.entity";

export class AuthService {
  async create(ctx: AppCtx["ctx"], options: AuthInputDto) {
    const errors = inputValidation<AuthInputDto, FieldErrorDto>(options);
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

    const valid = await crypt.compare(
      options.password || "",
      user.password || "",
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
