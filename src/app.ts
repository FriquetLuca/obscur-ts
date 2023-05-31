import { env } from "./env/server";
import middleware from "./server/middleware/middleware";

const startApp = async (host: string, port: number) => {
  const app = await middleware();
  app.listen({ host, port }, (err: unknown) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`Server listening at http://${env.HOST}:${env.PORT}`);
  });
};
void startApp(env.HOST, env.PORT ?? 80);
