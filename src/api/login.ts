import bcrypt from "bcrypt";
import type { APIConfig, GetHandlerReply, GetHandlerRequest } from "obscur-server";
import type { Session } from "../app/models/session";
import type { LoginUser } from "../app/models/user";
import prisma from "../app/database/prisma";

export const config: APIConfig = {
  handlerType: "GET"
};

export default async function Login(request: GetHandlerRequest, reply: GetHandlerReply) {
  const { username, password } = JSON.parse(request.body as string) as LoginUser;
  const user = await prisma.user.findUnique({ where: { username } });
  if(user) {
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(isPasswordValid) {
      request.session.set("cookie", {
        id: user.id,
        logged: true
      } as Session);
      reply.send({ message: "Logged in successfully." });
    }
  }
  reply.status(401).send({ message: "Invalid username or password." });
}