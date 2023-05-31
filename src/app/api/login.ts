import bcrypt from "bcrypt";
import type { LoginUser } from "../models/user";
import prisma from "src/database/prisma";
import type { GetHandlerReply, GetHandlerRequest } from "../middleware/middleware";

export default async function Login(request: GetHandlerRequest, reply: GetHandlerReply) {
  const { username, password } = JSON.parse(request.body as string) as LoginUser;
  const user = await prisma.user.findUnique({ where: { username } });
  if(user) {
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(isPasswordValid) {
      request.session.set("isLoggedIn", true);
      request.session.set("userId", user.id);
      reply.send({ message: "Logged in successfully." });
    }
  }
  reply.status(401).send({ message: "Invalid username or password." });
}