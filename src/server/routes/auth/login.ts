import prisma from "../../utils/prisma";
import type { FastifyReply, FastifyRequest } from "../../types/global";
import bcrypt from "bcrypt";
import type { LoginUser } from "../../models/user";

export default async function Login(request: FastifyRequest, reply: FastifyReply, post: Record<string, unknown>) {
  const { username, password } = post as LoginUser;
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