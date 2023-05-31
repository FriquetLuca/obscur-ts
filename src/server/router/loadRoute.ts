import type { GetHandler, PostHandler } from "../middleware/middleware";

export type APIConfig = {
  handlerType: "GET" | "POST";
};

type RouteInfo = {
  filePath: string;
  importPath: string;
  type: "PAGE" | "API";
};

type APIModel = {
  config?: APIConfig;
  default: PostHandler;
};

type PageModel = {
  default: GetHandler;
};

export function loadRoute<T extends RouteInfo>(routeInfo: T): T["type"] extends "API" ? APIModel : PageModel {
  const importedRoute = require(routeInfo.importPath) as unknown;
  if(typeof importedRoute !== "object") {
    const errorMsg = `The loaded ${routeInfo.type} located at ${routeInfo.filePath} is not valid.`;
    throw new Error(errorMsg);
  }
  return importedRoute as T["type"] extends "API" ? APIModel : PageModel;
}