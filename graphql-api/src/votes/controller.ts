import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from "type-graphql";
import checkAuth from "../__shared__/middleware/auth.middleware";
import { AppCtx } from "../typings";
import { VoteResponseDto } from "./dto";
import { CreateVoteDto } from "./dto";
import { VotesService } from "./service";
import { Vote } from "./vote.entity";

@Resolver(Vote)
export class VotesController {
  private votesService = new VotesService();

  @Mutation(() => VoteResponseDto)
  @UseMiddleware(checkAuth)
  async createVote(
    @Arg("dto") dto: CreateVoteDto,
    @Ctx() { ctx }: AppCtx
  ): Promise<VoteResponseDto> {
    return this.votesService.create(ctx, dto);
  }
}
