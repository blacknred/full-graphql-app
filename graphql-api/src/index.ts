import Server from "./server";
import config, { validateEnv } from "./utils/config";

validateEnv();

/** run server */
export default new Server(config);
