import { Post } from "../posts/entity";
import { Vote } from "./entity";
import { CreateVoteDto } from "./dto";
import { AppCtx } from "src/__shared__/interfaces/context.interface";

export class VotesService {
  async create(ctx: AppCtx["ctx"], { value, postId }: CreateVoteDto) {
    const { userId } = ctx.session!;
    const val = value < 0 ? -1 : 1;

    const post = await Post.findOne(postId);
    if (!post) {
      const error = {
        field: "id",
        message: "Post not found",
      };
      return { errors: [error] };
    }

    await Vote.createQueryBuilder("v")
      .insert()
      .values({ postId, userId, value: val })
      .onConflict(`("userId", "postId") DO UPDATE SET "value" = :value`)
      .setParameter("value", value)
      .execute();

    return Vote.createQueryBuilder("v")
      .select("SUM(v.value)", "data")
      .where({ postId })
      .getRawOne();
  }
}
