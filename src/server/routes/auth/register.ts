import prisma from "../../utils/prisma";
import type { FastifyReply, FastifyRequest } from "../../types/global";
import bcrypt from "bcrypt";
import type { RegisterUser } from "../../models/user";

export default async function Register(request: FastifyRequest, reply: FastifyReply, post: Record<string, unknown>) {
  const { username, password } = post as RegisterUser;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    await prisma.user.create({ data: { username, password: hashedPassword } });
    reply.send({ message: "User registered successfully." });
  } catch (error) {
    reply.status(400).send({ message: "Registration failed." });
  }
}