import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Post } from "../posts/entity";
import { Vote } from "../votes/entity";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  username!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @UpdateDateColumn()
  createdAt = new Date();

  @UpdateDateColumn()
  updatedAt = new Date();

  @OneToMany(() => Post, post => post.creator)
  posts!: Post[]

  @OneToMany(() => Vote, vote => vote.user)
  votes!: Vote[]
}

