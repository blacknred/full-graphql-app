import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne, PrimaryColumn
} from "typeorm";
import { User } from "../users/entity";
import { Post } from "../posts/entity";

@Entity()
export class Vote extends BaseEntity {
  @Column({ type: 'int' })
  value!: 1 | -1;
  
  @PrimaryColumn()
  userId!: number;

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
