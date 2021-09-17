import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Post } from "../posts/post.entity";
import { Vote } from "../posts/vote.entity";

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

// export async function set(id, value) {
//   await db.query(sql`
//     INSERT INTO my_data (id, data)
//     VALUES (${id}, ${value})
//     ON CONFLICT id
//     DO UPDATE SET data = EXCLUDED.data;
//   `);
// }

