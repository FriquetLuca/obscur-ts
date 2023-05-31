import { defaultLanguage, isLocales, LocalesLanguagesKey } from "./locales";
import type { FastifyServer } from "./createServer";

type PageRouterParams = Parameters<FastifyServer["get"]>;
type APIRouterParams = Parameters<FastifyServer["post"]>;

type PageRouterFastifyHandler = Pick<PageRouterParams[1], "handler">["handler"];
type APIRouterFastifyHandler = Pick<APIRouterParams[1], "handler">["handler"];

type PageRouterHandlerParams = Parameters<PageRouterFastifyHandler>;
type APIRouterHandlerParams = Parameters<APIRouterFastifyHandler>;

/**
 * The get handler's request from fastify.
 */
export type GetHandlerRequest = PageRouterHandlerParams[0] & {
  locale: LocalesLanguagesKey;
  route?: string;
};
/**
 * The post handler's request from fastify.
 */
export type PostHandlerRequest = APIRouterHandlerParams[0] & {
  locale: LocalesLanguagesKey;
  route?: string;
};
/**
 * The get handler's reply from fastify.
 */
export type GetHandlerReply = PageRouterHandlerParams[1];
/**
 * The post handler's reply from fastify.
 */
export type PostHandlerReply = APIRouterHandlerParams[1];
/**
 * The get handler's from fastify
 */
export type GetHandler = (request: GetHandlerRequest, reply: GetHandlerReply) => unknown;
/**
 * The post handler's from fastify
 */
export type PostHandler = (request: PostHandlerRequest, reply: PostHandlerReply) => unknown;



export default async function middleware(app: FastifyServer) {
  app.addHook("preHandler", (req, _, done) => {
    const reqURL = req.raw.url;
    if(reqURL !== undefined) {
      const path = reqURL.split('?')[0] ?? ""; // Remove query parameters from URL path
      const langCode = path.split('/')[1]; // Extract language code from URL path
      if(langCode && isLocales(langCode)) {
        const newPath = `/${path.split('/').slice(2).join('/')}`;
        const newUrl = `${(reqURL.split('?')[0] as string).replace(path, newPath)}${reqURL.split('?')[1] ? '?' + reqURL.split('?')[1] : ''}`;
        Object.assign(req, { locale: langCode }); // Set language code as a request property
        Object.assign(req, { route: newUrl }); // Set language code as a request property
      } else {
        Object.assign(req, { locale: defaultLanguage }); // Set language code as a request property
      }
    } else {
      Object.assign(req, { locale: defaultLanguage }); // Set language code as a request property
    }
    done();
  });
  return app;
}