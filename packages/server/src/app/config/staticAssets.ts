import type { FastifyStaticOptions } from "@fastify/static";
import path from "path";
import { env } from "../../env/server";

const staticAssets: FastifyStaticOptions = {
  root: path.join(process.cwd(), env.ASSETS_PATH ?? "assets/"),
  prefix: `/${env.ASSETS_PATH ?? ""}`,
  index: false,
  list: true
};

export default staticAssets;