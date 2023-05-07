import type { FastifyReply, FastifyRequest } from '../../../types/global';

export default async function Dashboard(request: FastifyRequest, reply: FastifyReply) {
  const isLoggedIn = request.session.get('isLoggedIn');
  if (!isLoggedIn) {
    reply.status(403).send({ message: 'Access denied. Please log in.' });
  } else {
    reply.send({ message: 'Welcome to the dashboard.' });
  }
}