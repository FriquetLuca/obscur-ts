import bcrypt from "bcrypt";
import prisma from "src/database/prisma";
import type { GetHandlerReply, GetHandlerRequest } from "../middleware/middleware";
import type { RegisterUser } from "../models/user";

export default async function Register(request: GetHandlerRequest, reply: GetHandlerReply) {
  const { username, password } = JSON.parse(request.body as string) as RegisterUser;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    await prisma.user.create({ data: { username, password: hashedPassword } });
    reply.send({ message: "User registered successfully." });
  } catch (error) {
    reply.status(400).send({ message: "Registration failed." });
  }
}