import type { Fastify, FastifyRequest } from "../types/global";
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
import rootPath from "src/appPath";
import { defaultLanguage, isLocales } from "../router/locales";

export default async function createServer(isHTTPS?: boolean) {
  const app: Fastify = fastify({ logger: env.NODE_ENV === "development" });
  await app.register(fastifyAuth);
  await app.register(fastifyCors, {
    origin: '*',
  });
  await app.register(fastifyStatic, {
    root: path.join(rootPath, "../", env.ASSETS_PATH ?? "assets/"),
    prefix: `/${env.ASSETS_PATH ?? "assets/"}`,
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
  app.addHook('preHandler', (req, _, done) => {
    if(req.raw.url) {
      const path = req.raw.url.split('?')[0] ?? ""; // Remove query parameters from URL path
      const langCode = path.split('/')[1]; // Extract language code from URL path
      if(langCode && isLocales(langCode)) {
        (req as unknown as FastifyRequest).locale = langCode ?? defaultLanguage as string; // Set language code as a request property
      } else {
        (req as unknown as FastifyRequest).locale = defaultLanguage as string; // Set language code as a request property
      }
    } else {
      (req as unknown as FastifyRequest).locale = defaultLanguage as string; // Set language code as a request property
    }
    done();
  });
  return app;
}