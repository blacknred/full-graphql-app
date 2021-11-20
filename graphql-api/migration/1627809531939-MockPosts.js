"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockPosts1627809531949 = void 0;
const path_1 = __importDefault(require("path"));
const fs = require("fs");
class MockPosts1627809531949 {
    async up(queryRunner) {
        await queryRunner.query('truncate vote, post, "user" cascade');
        const userSql = fs.readFileSync(path_1.default.join(__dirname, "./user.sql")).toString();
        await queryRunner.query(userSql);
        const postSql = fs.readFileSync(path_1.default.join(__dirname, "./post.sql")).toString();
        await queryRunner.query(postSql);
    }
    async down(_) { }
}
exports.MockPosts1627809531949 = MockPosts1627809531949;
//# sourceMappingURL=1627809531939-MockPosts.js.map