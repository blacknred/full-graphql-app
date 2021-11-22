import Router from "@koa/router";
import { Context } from "koa";
import { PaginationDto } from "src/__shared__/dto/request";
import useAuth from "src/__shared__/middleware/auth.middleware";
import useValidation from "src/__shared__/middleware/validation.middleware";
import {
  CreatePostDto,
  PostResponseDto,
  PostsResponseDto,
  UpdatePostDto
} from "./dto";
import { PostsService } from "./service";

export class PostsController {
  path = "/posts";
  private postsService = new PostsService();

  constructor(router: Router) {
    router.post(this.path, useAuth, useValidation(CreatePostDto), this.create);
    router.get(this.path, useAuth, useValidation(PaginationDto), this.getAll);
    router.get(`${this.path}/:id`, useAuth, this.getOne);
    router.patch(`${this.path}/:id`, useAuth, useValidation(UpdatePostDto), this.update);
    router.delete(`${this.path}/:id`, useAuth, this.delete);
  }

  async getAll(ctx: Context): Promise<PostsResponseDto> {
    const params = ctx.params as PaginationDto;
    return this.postsService.findAll(ctx, params);
  }

  async getOne(ctx: Context): Promise<PostResponseDto> {
    const id = ctx.params.id as number;
    return this.postsService.findOne(ctx, id);
  }

  async create(ctx: Context): Promise<PostResponseDto> {
    const dto = ctx.body as CreatePostDto;
    return this.postsService.create(ctx, dto);
  }

  async update(ctx: Context): Promise<PostResponseDto> {
    const dto = ctx.body as UpdatePostDto;
    return this.postsService.update(ctx, dto);
  }

  async delete(ctx: Context): Promise<null> {
    const id = ctx.params.id as number;
    return this.postsService.remove(ctx, id);
  }
}
