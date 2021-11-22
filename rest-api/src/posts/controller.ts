import Router from "@koa/router";
import { PaginationDto } from "src/__shared__/dto/request";
import { EmptyResponseDto } from "src/__shared__/dto/response";
import { AppCtx } from "src/__shared__/interfaces/context.interface";
import useAuth from "src/__shared__/middleware/auth.middleware";
import useValidation from "src/__shared__/middleware/validation.middleware";
import { CreatePostDto, PostResponseDto, PostsResponseDto } from "./dto";
import { PostsService } from "./service";

export class PostsController {
  path = "/posts";
  private postsService = new PostsService();

  constructor(router: Router) {
    router.all(`${this.path}/*`, useAuth);
    router.post(this.path, useValidation(CreatePostDto), this.create);
    router.get(this.path, useValidation(PaginationDto), this.getAll);
    router.get(`${this.path}/:id`, this.getOne);
    router.patch(`${this.path}/:id`, useValidation(CreatePostDto), this.update);
    router.delete(`${this.path}/:id`, this.delete);
  }

  async getAll(ctx: AppCtx): Promise<PostsResponseDto> {
    const params = ctx.request.body as PaginationDto;
    return this.postsService.findAll(ctx, params);
  }

  async getOne(ctx: AppCtx): Promise<PostResponseDto> {
    const id = ctx.params.id as number;
    return this.postsService.findOne(ctx, id);
  }

  async create(ctx: AppCtx): Promise<PostResponseDto> {
    const dto = ctx.request.body as CreatePostDto;
    return this.postsService.create(ctx, dto);
  }

  async update(ctx: AppCtx): Promise<PostResponseDto> {
    const id = ctx.params.id as number;
    const dto = ctx.request.body as CreatePostDto;
    return this.postsService.update(ctx, id, dto);
  }

  async delete(ctx: AppCtx): Promise<EmptyResponseDto> {
    const id = ctx.params.id as number;
    return this.postsService.remove(ctx, id);
  }
}
