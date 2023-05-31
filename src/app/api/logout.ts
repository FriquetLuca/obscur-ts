import type { GetHandlerReply, GetHandlerRequest } from "../middleware/middleware";


export default async function Logout(request: GetHandlerRequest, reply: GetHandlerReply) {
  request.session.set("isLoggedIn", false);
  request.session.set("userId", null);
  reply.send({ message: "Logged out successfully." });
}