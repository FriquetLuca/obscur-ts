import { env } from "./env/server";
import createServer from "./server/middleware/createServer";
import middleware from "./server/middleware/middleware";

const startApp = async (host: string, port: number) => {
  middleware(await createServer())
    .listen({ host, port }, (err: unknown) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      console.log(`Server listening at http://${host}:${port}`);
    });
};
void startApp(env.HOST, env.PORT ?? 80);
