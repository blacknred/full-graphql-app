import Router from "@koa/router";
import { AppCtx } from "src/__shared__/interfaces/context.interface";
import useAuth from "src/__shared__/middleware/auth.middleware";
import useValidation from "src/__shared__/middleware/validation.middleware";
import { CreateVoteDto, VoteResponseDto } from "./dto";
import { VotesService } from "./service";

export class VotesController {
  path = "/votes";
  private votesService = new VotesService();

  constructor(router: Router) {
    router.post(this.path, useAuth, useValidation(CreateVoteDto), this.create);
  }

  async create(ctx: AppCtx): Promise<VoteResponseDto> {
    const dto = ctx.request.body as CreateVoteDto;
    return this.votesService.create(ctx, dto);
  }
}
