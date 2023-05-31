import { env } from "../../env/server";
import fastify from "fastify";
import fastifyAuth from "@fastify/auth";
import fastifyCors from "@fastify/cors";
import fastifyFormbody from "@fastify/formbody";
import fastifyMultipart from "@fastify/multipart";
import fastifyCookie from "@fastify/cookie";
import fastifySession from "@fastify/session";
import fastifyStatic from "@fastify/static";
import qs from "qs";
import path from "path";
import rootPath from "../../appPath";

/**
 * The fastify application.
 */
export type FastifyServer = Awaited<ReturnType<typeof createServer>>;

export default async function createServer(isHTTPS?: boolean) {
  const app = fastify({ logger: env.NODE_ENV === "development" });
  await app.register(fastifyAuth);
  await app.register(fastifyCors, {
    origin: '*',
  });
  await app.register(fastifyStatic, {
    root: path.join(rootPath, "../", env.ASSETS_PATH ?? "assets/"),
    prefix: `/${env.ASSETS_PATH ?? ""}`,
    index: false,
    list: true
  });
  await app.register(fastifyFormbody, { parser: str => qs.parse(str) });
  await app.register(fastifyMultipart);
  await app.register(fastifyCookie);
  await app.register(fastifySession, {
    secret: env.SESSION_SECRET, // Change this to your desired secret
    cookie: {
      sameSite: true,
      secure: isHTTPS
    }
  });
  return app;
}