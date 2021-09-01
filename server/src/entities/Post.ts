import { Field, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User";
import { Vote } from "./Vote";

@Entity()
@ObjectType()
export class Post extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  title!: string;

  @Field()
  @Column()
  text!: string;

  @Field()
  @Column()
  creatorId!: number;

  @Field(() => String)
  @UpdateDateColumn()
  createdAt = new Date();

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt = new Date();

  //

  @Field()
  @ManyToOne(() => User, (user) => user.posts, {
    onDelete: "CASCADE",
  })
  creator!: User;

  @Field(() => [Vote])
  @OneToMany(() => Vote, (vote) => vote.postId)
  votes!: Vote[];

  @Field(() => Int, { nullable: true })
  rating = 0;

  @Field({ nullable: true })
  userVote!: Vote;

  // @AfterLoad()
  setComputed(userId: number): void {
    for (const vote of this.votes) {
      this.rating += vote.value;
      if (vote.userId === userId) this.userVote = vote;
    }
  }
}
