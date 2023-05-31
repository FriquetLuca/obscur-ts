export type NativeJSON<T extends "array" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "string" | "class" | "function"> = {
  type: T;
  value: T extends "function"
    ? (...args: unknown[]) => unknown
    : T extends "string"
    ? string
    : T extends "array"
    ? unknown[]
    : T extends "number"
    ? number
    : T extends "bigint"
    ? bigint
    : T extends "boolean"
    ? boolean
    : T extends "object"
    ? object
    : T extends "undefined"
    ? undefined
    : T extends "class"
    ? object & {
      toString: (...args: unknown[]) => string
    }
    : never;
};

const JSONstringify = (item: unknown) => JSON.stringify(item, (key, value) => {
  const currentTypeof = typeof value;
  return currentTypeof === "function"
  ? {
      type: /^\s*class\s+/.test(value.toString()) ? "class" : "function",
      value: value.toString()
    }
  : {
      type: Array.isArray(value) ? "array" : currentTypeof,
      value
    };
});

export default JSONstringify;