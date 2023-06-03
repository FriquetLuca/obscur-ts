import fastify from "fastify";
import { env } from "../../env/server";

export const application = fastify({ logger: env.NODE_ENV === "development" });
export type FastifyInstance = typeof application;