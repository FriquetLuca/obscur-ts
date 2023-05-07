import type fastify from "fastify";
import type { RequestRouteOptions } from "fastify/types/request";
import type { Socket } from "net";
import type { Session } from '../models/session';
import type { HTTPContentTypeValues } from "../structures/httpContent";

export type Fastify = ReturnType<typeof fastify>;
type Callback = (err?: unknown) => void;
interface FastifyCookie {
  originalMaxAge: number | null;
  maxAge?: number;
  signed?: boolean;
  expires?: Date | null;
  httpOnly?: boolean;
  path?: string;
  domain?: string;
  secure?: boolean | 'auto';
  sameSite?: boolean | 'lax' | 'strict' | 'none';
}
interface FSession {
  sessionId: string;
  cookie: FastifyCookie;
  encryptedSessionId: string;

  /** Updates the `expires` property of the session's cookie. */
  touch(): void;

  /**
   * Regenerates the session by generating a new `sessionId`.
   *
   * ignoreFields specifies which fields should be kept in the new session object.
   */
  regenerate(callback: Callback): void;
  regenerate(ignoreFields: string[], callback: Callback): void;
  regenerate(): Promise<void>;
  regenerate(ignoreFields: string[]): Promise<void>;

  /** Allows to destroy the session in the store. */
  destroy(callback: Callback): void;
  destroy(): Promise<void>;

  /** Reloads the session data from the store and re-populates the request.session object. */
  reload(callback: Callback): void;
  reload(): Promise<void>;

  /** Save the session back to the store, replacing the contents on the store with the contents in memory. */
  save(callback: Callback): void;
  save(): Promise<void>;

  /** sets values in the session. */
  set(key: string, value: unknown): void;

  /** gets values from the session. */
  get(key: string): unknown;

  /** checks if session has been modified since it was generated or loaded from the store. */
  isModified(): boolean;
}
interface FastifySession {
  sessionId: string;
  cookie: FastifyCookie;
  encryptedSessionId: string;

  /** Updates the `expires` property of the session's cookie. */
  touch(): void;

  /**
   * Regenerates the session by generating a new `sessionId`.
   *
   * ignoreFields specifies which fields should be kept in the new session object.
   */
  regenerate(callback: Callback): void;
  regenerate(ignoreFields: string[], callback: Callback): void;
  regenerate(): Promise<void>;
  regenerate(ignoreFields: string[]): Promise<void>;

  /** Allows to destroy the session in the store. */
  destroy(callback: Callback): void;
  destroy(): Promise<void>;

  /** Reloads the session data from the store and re-populates the request.session object. */
  reload(callback: Callback): void;
  reload(): Promise<void>;

  /** Save the session back to the store, replacing the contents on the store with the contents in memory. */
  save(callback: Callback): void;
  save(): Promise<void>;

  /** sets values in the session. */
  set<T extends Session, U extends keyof T>(key: U, value: T[U] | null): void;

  /** gets values from the session. */
  get<T extends Session, U extends keyof T>(key: U): T[U] | null;

  /** checks if session has been modified since it was generated or loaded from the store. */
  isModified(): boolean;
}
type Request = unknown & { body: unknown };
type ObscurifyRequest<T, U extends FastifySession | FSession> = {
  body: T;
  session: U;
  readonly socket: Socket;
  readonly connection: Socket;
  readonly ip: string;
  readonly ips?: string[];
  readonly hostname: string;
  readonly url: string;
  readonly protocol: 'http' | 'https';
  readonly method: string;
  readonly routerPath: string;
  readonly routerMethod: string;
  readonly routeOptions: Readonly<RequestRouteOptions>
  readonly is404: boolean;
};

export type FastifyRequest = ObscurifyRequest<unknown, FastifySession>;
export type FRequest = ObscurifyRequest<unknown, FSession>;

export type FastifyReply = {
  status: (type: number) => FastifyReply;
  send: <T>(message: T) => FastifyReply;
  type: (contentType: HTTPContentTypeValues) => FastifyReply;
};