import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany, PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { User } from "../users/entity";
import { Vote } from "../votes/entity";

@Entity()
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column()
  text!: string;

  @Column()
  creatorId!: number;

  @UpdateDateColumn()
  createdAt = new Date();

  @UpdateDateColumn()
  updatedAt = new Date();

  //

  @ManyToOne(() => User, (user) => user.posts, {
    onDelete: "CASCADE",
  })
  creator!: User;

  @OneToMany(() => Vote, (vote) => vote.postId)
  votes!: Vote[];

  rating = 0;

  userVote!: Vote;

  // @AfterLoad()
  setComputed(userId: number): void {
    for (const vote of this.votes) {
      this.rating += vote.value;
      if (vote.userId === userId) this.userVote = vote;
    }
  }
}
