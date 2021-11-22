import {
  Arg,
  Ctx,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from "type-graphql";
import checkAuth from "../__shared__/middleware/auth.middleware";
import { AppCtx } from "../__shared__/interfaces/context.interface";
import { PaginatedInputDto } from "../__shared__/dto/response";
import {
  CreatePostDto,
  PostResponseDto,
  PostsResponseDto,
  UpdatePostDto,
} from "./dto";
import { Post } from "./entity";
import { PostsService } from "./service";

@Resolver(Post)
export class PostsController {
  private postsService = new PostsService();

  @FieldResolver(() => String)
  textSnippet(@Root() post: Post) {
    return post.text.slice(0, 500);
  }

  @Query(() => PostsResponseDto)
  async getMany(
    @Arg("params") params: PaginatedInputDto,
    @Ctx() { ctx }: AppCtx
  ): Promise<PostsResponseDto> {
    return this.postsService.findAll(ctx, params);
  }

  @Query(() => Post, { nullable: true })
  async getOne(
    @Arg("id") id: number,
    @Ctx() { ctx }: AppCtx
  ): Promise<Post | undefined> {
    return this.postsService.findOne(ctx, id);
  }

  @Mutation(() => PostResponseDto)
  @UseMiddleware(checkAuth)
  async create(
    @Arg("dto") dto: CreatePostDto,
    @Ctx() { ctx }: AppCtx
  ): Promise<PostResponseDto> {
    return this.postsService.create(ctx, dto);
  }

  @Mutation(() => PostResponseDto, { nullable: true })
  @UseMiddleware(checkAuth)
  async update(
    @Arg("dto") dto: UpdatePostDto,
    @Ctx() { ctx }: AppCtx
  ): Promise<PostResponseDto> {
    return this.postsService.update(ctx, dto);
  }

  @Mutation(() => PostResponseDto)
  @UseMiddleware(checkAuth)
  async delete(
    @Arg("id") id: number,
    @Ctx() { ctx }: AppCtx
  ): Promise<PostResponseDto> {
    return this.postsService.remove(ctx, id);
  }
}
