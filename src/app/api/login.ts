import bcrypt from "bcrypt";
import prisma from "../../database/prisma";
import type { LoginUser } from "../../server/models/user";
import type { GetHandlerRequest, GetHandlerReply } from "../../server/middleware/middleware";
import { APIConfig } from "../../server/router/loadRoute";

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
      });
      reply.send({ message: "Logged in successfully." });
    }
  }
  reply.status(401).send({ message: "Invalid username or password." });
}