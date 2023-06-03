import bcrypt from "bcrypt";
import type { GetHandlerReply, GetHandlerRequest } from "obscur-server";
import type { RegisterUser } from "../app/models/user";
import prisma from "../app/database/prisma";

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