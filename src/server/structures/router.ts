export const routeTypes = [
  "API",
  "AUTH",
  "PAGES"
] as const;
type RouteTypeKey = (typeof routeTypes)[number];

export type RouteInfo = {
  type: RouteTypeKey;
  path: string;
  importPath: string;
};