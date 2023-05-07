import { env } from "./env/server";
import createServer from "./server/utils/createServer";
import { registerRoutes } from "./server/router/router";
import type { Fastify } from "./server/types/global";

const startApp = async (host: string, port: number) => {
  const app = await createServer();
  registerRoutes(app as Fastify);
  app.listen({ host, port }, (err: unknown) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`Server is running at http://${env.HOST}:${env.PORT}`);
  });
};
void startApp(env.HOST, env.PORT ?? 80);
