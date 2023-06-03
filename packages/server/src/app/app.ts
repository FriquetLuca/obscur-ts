import { application } from "./fastify/fastify";
import hooks from "./fastify/hooks";
import register from "./fastify/register";

export const startApp = async (host: string, port: number) => {
  const currentApp = await register(application);
  hooks(currentApp);
  currentApp.get("/app", (req, reply) => {
    const escapeHtml = (unsafe: string) => {
      return unsafe.replace(/"/g, '&quot;');
    };
    const click = (e: MouseEvent) => {
      console.log("Click!");
      console.log(e);
    };

    reply.type("text/html").send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
      <script src="/assets/test.js" defer></script>
    </head>
    <body>
      <div onClick="${escapeHtml(click.toString())}">Hello world!</div>
    </body>
    </html>
    `);
  });
  currentApp
    .listen({ host, port }, (err: unknown) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      console.log(`Server listening at http://${host}:${port}`);
    });
};