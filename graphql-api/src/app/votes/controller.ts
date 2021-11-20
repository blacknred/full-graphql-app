import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from "type-graphql";
import checkAuth from "../../middleware/checkAuth";
import { AppCtx } from "../../typings";
import { VoteResponseDto } from "../votes/dto";
import { CreateVoteDto } from "./dto";
import { VotesService } from "./service";
import { Vote } from "./vote.entity";

@Resolver(Vote)
export class PostController {
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
