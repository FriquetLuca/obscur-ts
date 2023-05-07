import { type Fastify, type FastifyRequest, type Request } from "../types/global";
import { type RouteInfo } from "../structures/router";
import { type AuthRoute, type ShadowServerRoute, type PagesRoute } from "../types/router";
import { getRouteInfo } from "./getRouteInfo";

function loadRoute(routeInfo: RouteInfo) {
  const importedRoute = require(routeInfo.importPath) as unknown;
  if(typeof importedRoute !== "object") {
    const errorMsg = `The loaded ${routeInfo.type} located at ${routeInfo.path} is not valid.`;
    throw new Error(errorMsg);
  }
  return importedRoute;
}
export function registerRoutes(app: Fastify) {
  const mappedroutes = getRouteInfo();
  for(const route of mappedroutes) {
    const [routePath, routeInfo] = route;
    const currentRoute = loadRoute(routeInfo) as Record<"default" | string, unknown>;
    if(typeof currentRoute.default === "function") {
      switch(routeInfo.type) {
        case "AUTH":
          app.post(routePath, async (request, reply) => {
            const defaultRoute = currentRoute.default as AuthRoute;
            await defaultRoute(request as unknown as FastifyRequest, reply, JSONPost(request));
          });
          break;
        case "PAGES":
          app.get(routePath, async (request, reply) => {
            const defaultRoute = currentRoute.default as PagesRoute;
            const response = await defaultRoute(request as unknown as FastifyRequest, reply);
            reply.type("text/html").send(response);
          });
          break;
        default:
          app.get(routePath, currentRoute.default as ShadowServerRoute);
          break;
      }
    }
  }
}

function JSONPost(request: Request): object {
  return JSON.parse(request.body as unknown as string) as object;
}