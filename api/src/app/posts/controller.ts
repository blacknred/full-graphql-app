import {
  Arg,
  Ctx,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
  UseMiddleware
} from "type-graphql";
import checkAuth from "../../middleware/checkAuth";
import { AppCtx } from "../../typings";
import { PaginatedInputDto } from "../../utils/sharedDto";
import {
  PostInputDto,
  PostResponseDto,
  PostsResponseDto,
  VoteResponseDto
} from "./dto";
import { Post } from "./entity";
import { PostsService } from "./service";

@Resolver(Post)
export class PostController {
  private postsService = new PostsService();

  @FieldResolver(() => String)
  textSnippet(@Root() post: Post) {
    return post.text.slice(0, 500);
  }

  @Query(() => PostsResponseDto)
  async getPosts(
    @Arg("params") params: PaginatedInputDto,
    @Ctx() { ctx }: AppCtx
  ): Promise<PostsResponseDto> {
    return this.postsService.findAll(ctx, params);
  }

  @Query(() => Post, { nullable: true })
  async getPost(
    @Arg("id") id: number,
    @Ctx() { ctx }: AppCtx
  ): Promise<Post | undefined> {
    return this.postsService.findOne(ctx, id);
  }

  @Mutation(() => PostResponseDto)
  @UseMiddleware(checkAuth)
  async createPost(
    @Arg("options") options: PostInputDto,
    @Ctx() { ctx }: AppCtx
  ): Promise<PostResponseDto> {
    return this.postsService.create(ctx, options);
  }

  @Mutation(() => PostResponseDto, { nullable: true })
  @UseMiddleware(checkAuth)
  async updatePost(
    @Arg("id") id: number,
    @Arg("options") options: PostInputDto,
    @Ctx() { ctx }: AppCtx
  ): Promise<PostResponseDto> {
    return this.postsService.update(ctx, id, options);
  }

  @Mutation(() => PostResponseDto)
  @UseMiddleware(checkAuth)
  async deletePost(
    @Arg("id") id: number,
    @Ctx() { ctx }: AppCtx
  ): Promise<PostResponseDto> {
    return this.postsService.remove(ctx, id);
  }

  @Mutation(() => VoteResponseDto)
  @UseMiddleware(checkAuth)
  async vote(
    @Arg("postId") postId: number,
    @Arg("value") value: 1 | -1,
    @Ctx() { ctx }: AppCtx
  ): Promise<VoteResponseDto> {
    return this.postsService.createVote(ctx, postId, value);
  }
}
