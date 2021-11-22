import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne, PrimaryColumn
} from "typeorm";
import { User } from "../users/entity";
import { Post } from "../posts/entity";

@Entity()
@ObjectType()
export class Vote extends BaseEntity {
  @Field()
  @Column({ type: 'int' })
  value!: 1 | -1;
  
  @PrimaryColumn()
  userId!: number;

  @Field(() => User)
  @ManyToOne(() => User, user => user.votes, {
    onDelete: 'CASCADE',
  })
  user!: User;

  @PrimaryColumn()
  postId!: number;

  @ManyToOne(() => Post, post => post.votes, {
    onDelete: 'CASCADE',
  })
  post!: Post;
}
