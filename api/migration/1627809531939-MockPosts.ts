import path from "path";
import { MigrationInterface, QueryRunner } from "typeorm";
const fs = require("fs");

export class MockPosts1627809531949 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('truncate vote, post, "user" cascade');
    const userSql = fs.readFileSync(path.join(__dirname, "./user.sql")).toString();
    await queryRunner.query(userSql);
    const postSql = fs.readFileSync(path.join(__dirname, "./post.sql")).toString();
    await queryRunner.query(postSql);
  }

  public async down(_: QueryRunner): Promise<void> {}
}
