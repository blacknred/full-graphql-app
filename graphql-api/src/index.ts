import Server from "./app";
import { AuthModule } from "./auth";
import { HealthModule } from "./health";
import { PostsModule } from "./posts";
import { UsersModule } from "./users";
import { VotesModule } from "./votes";
import config, { validateEnv } from "./__shared__/utils/config";

validateEnv();

/** run server */
export default new Server(config, [
  AuthModule,
  UsersModule,
  HealthModule,
  PostsModule,
  VotesModule,
]);
