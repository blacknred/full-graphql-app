import { FieldError } from "./typings";
import { Cache, QueryInput } from "@urql/exchange-graphcache";

export const isServer = () => typeof window === "undefined";

export function delay(ms = 1000): Promise<void> {
  return new Promise((r) => setInterval(r, ms));
}

export function errorMap(errors: FieldError[]) {
  const map: Record<string, string> = {};
  for (let { field, message } of errors) {
    map[field] = message;
  }

  return map;
}

export function betterUpdateQuery<Result, Query>(
  cache: Cache,
  qi: QueryInput,
  result: any,
  fn: (r: Result, q: Query) => Query
) {
  return cache.updateQuery(qi, (data) => fn(result, data as any) as any);
}

const intervals = [
  { label: "year", seconds: 31536000 },
  { label: "month", seconds: 2592000 },
  { label: "day", seconds: 86400 },
  { label: "hour", seconds: 3600 },
  { label: "minute", seconds: 60 },
  { label: "second", seconds: 1 },
];

export function timeSince(date: number | string) {
  const seconds = Math.floor((Date.now() - new Date(+date).getTime()) / 1000);
  const interval = intervals.find((i) => i.seconds < seconds) || intervals[5];
  const count = Math.floor(seconds / interval.seconds);
  return `${count} ${interval.label}${count !== 1 ? "s" : ""} ago`;
}

export function getRandBgColor(saturation = 50) {
  const colors = ["pink", "green", "orange", "gray", "facebook", 'violet'];
  const index = Math.floor(Math.random() * colors.length);
  return `${colors[index]}.${saturation}`;
}
