import Server from "./server";
import config from "./utils/config";
import validateEnv from "./utils/validateEnv";

validateEnv();

/** run server */
export default new Server(config);
