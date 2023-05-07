import type { FastifyReply, FastifyRequest } from "../../types/global";

export default async function Logout(request: FastifyRequest, reply: FastifyReply) {
  request.session.set("isLoggedIn", false);
  request.session.set("userId", null);
  reply.send({ message: "Logged out successfully." });
}