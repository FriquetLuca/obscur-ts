import type { FastifyStaticOptions } from "@fastify/static";
import path from "path";
import { env } from "../../env/server";
import rootPath from "../../rootPath";

const staticAssets: FastifyStaticOptions = {
  root: path.join(rootPath, env.ASSETS_PATH ?? "assets/"),
  prefix: `/${env.ASSETS_PATH ?? ""}`,
  index: false,
  list: true
};

export default staticAssets;