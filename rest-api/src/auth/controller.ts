
import Router from '@koa/router';
import { UserResponseDto } from 'src/users/dto';
import { EmptyResponseDto } from 'src/__shared__/dto/response';
import { AppCtx } from 'src/__shared__/interfaces/context.interface';
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

  async create(ctx: AppCtx): Promise<UserResponseDto> {
    const dto = ctx.request.body as CreateAuthDto;
    return this.authService.create(ctx, dto);
  }

  async getOne(ctx: AppCtx): Promise<UserResponseDto> {
    return this.authService.findOne(ctx);
  }

  delete(ctx: AppCtx): EmptyResponseDto {
    return this.authService.remove(ctx);
  }
}
