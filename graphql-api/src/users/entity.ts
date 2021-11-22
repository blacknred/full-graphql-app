import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Post } from "../posts/entity";
import { Vote } from "../votes/entity";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column({ unique: true })
  username!: string;

  @Field()
  @Column({ unique: true })
  email!: string;

  @Field()
  @Column()
  password!: string;

  @Field(() => String)
  @UpdateDateColumn()
  createdAt = new Date();

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt = new Date();

  @OneToMany(() => Post, post => post.creator)
  posts!: Post[]

  @OneToMany(() => Vote, vote => vote.user)
  votes!: Vote[]
}

