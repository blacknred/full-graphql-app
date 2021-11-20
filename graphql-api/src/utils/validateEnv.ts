import { cleanEnv, port, str, num } from "envalid";

function validateEnv() {
  cleanEnv(process.env, {
    SECRET: str(),
    DB_URL: str(),
    REDIS_URL: str(),
    PORT: port(),
    CLIENT_HOSTS: str(),
    ONLINE_TIMESPAN: num(),
  });
}

export default validateEnv;
