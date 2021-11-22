
import Router from '@koa/router';
import { Context } from "koa";
import { UserResponseDto } from 'src/users/dto';
import { User } from 'src/users/entity';
import useAuth from "src/__shared__/middleware/auth.middleware";
import useValidation from "src/__shared__/middleware/validation.middleware";
import { CreateAuthDto } from "./dto";
import { AuthService } from "./service";

export class AuthController {
  path = '/auth';
  private authService = new AuthService();

  constructor(router: Router) {
    router.post(this.path, useValidation(CreateAuthDto), this.create);
    router.get(this.path, useAuth, this.getOne);
    router.del(this.path, useAuth, this.delete);
  }

  async create(ctx: Context): Promise<UserResponseDto> {
    const dto = ctx.body as CreateAuthDto;
    return this.authService.create(ctx, dto);
  }

  async getOne(ctx: Context): Promise<User | undefined> {
    return this.authService.findOne(ctx);
  }

  delete(ctx: Context): boolean {
    return this.authService.remove(ctx);
  }
}
