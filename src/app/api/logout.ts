import type { GetHandlerReply, GetHandlerRequest } from "../../server/middleware/middleware";

export default async function Logout(request: GetHandlerRequest, reply: GetHandlerReply) {
  request.session.set("cookie", null);
  reply.send({ message: "Logged out successfully." });
}