import { Request } from "koa";
import koaCors from "koa-cors";

/** dynamic cors policy */

export default (clients: __Config__["__clients__"]): koaCors.Options => {
  if (!clients) return {};
  return {
    credentials: true,
    origin: (req: Request) =>
      clients?.find((h) => h === req.get("Origin")) || "",
  };
};
