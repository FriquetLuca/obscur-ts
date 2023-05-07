import path from "path";
import getDirectoryContentList from "../utils/fs/getDirectoryContentList";
import rootPath from "../../appPath";
import { type RouteInfo, routeTypes } from "../structures/router";

const removeExtension = (filePath: string) => filePath.slice(0, -path.extname(filePath).length);
function removeIndex(filePath: string) {
  const fileName = path.basename(filePath);
  if(fileName === "index") {
    return filePath.slice(0, -(fileName.length + 1));
  }
  return filePath;
}
function removePages(filePath: string) {
  const fileName = filePath.slice(0, 5);
  if(fileName === "pages") {
    if(filePath === "pages") {
      return "/";
    }
    return filePath.slice(5);
  }
  return `/${filePath}`;
}

function nextToFastifyRoutePaths(str: string): string {
  return str.replace(/\[([^[\]]+)\]/g, ':$1');
}

function findRouteType(filePath: string) {
  for(const rtype of routeTypes) {
    if(filePath.slice(0, rtype.length).toUpperCase() === rtype) {
      return rtype;
    }
  }
  return undefined;
}
export function getRouteInfo() {
  const routePath = path.join(rootPath, "server/routes/");
  const files = getDirectoryContentList(routePath, "FILES");
  const mapFiles = new Map<string, RouteInfo>();
  for(const filePath of files) {
    const currentPath = removeIndex(path.relative(routePath, removeExtension(filePath)));
    const fastifyRoutes = nextToFastifyRoutePaths(removePages(currentPath));
    mapFiles.set(fastifyRoutes, {
      type: findRouteType(currentPath) ?? "PAGES",
      path: filePath,
      importPath: removeExtension(filePath)
    });
  }
  return mapFiles;
}