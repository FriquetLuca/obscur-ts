import type { FastifyRequest, FastifyReply, FRequest } from '../types/global';
export type ShadowServerRoute = (request: FRequest, reply: FastifyReply) => Promise<void>;
export type ServerRoute = (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
export type AuthRoute = (request: FastifyRequest, reply: FastifyReply, postJSON: object) => Promise<void>;
export type PagesRoute = (request: FastifyRequest, reply: FastifyReply) => Promise<string>;