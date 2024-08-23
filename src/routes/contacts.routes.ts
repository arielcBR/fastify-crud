import { FastifyInstance } from 'fastify';
import { ContactUseCase } from '../usecases/contacts.usecase';
import { Contact, ContactCreate } from '../interfaces/contacts.interface';
import { authMiddleware } from '../middlewares/auth.middleware';

export async function contactsRoutes(fastify: FastifyInstance) {
  const contactUseCase = new ContactUseCase()
  
  fastify.addHook('preHandler', authMiddleware);

  fastify.post<{Body: ContactCreate}>('/', async (req, reply) => {
    const { name, email, phone } = req.body
    const emailUser = req.headers['email'];

    try {
      const data = await contactUseCase.create({
        name,
        email,
        phone,
        userEmail: emailUser
      });

      return reply.send(data)

    } catch (error) {
      console.log(error)
      reply.send(error)
    }
  });

  fastify.get('/', async (req, reply) => {
    const emailUser = req.headers['email'];
    
    try {
      const data = await contactUseCase.listAllContact(emailUser);

      return reply.send(data)

    } catch (error) {
      console.log(error)
      reply.send(error)
    }
  });

  fastify.put<{Body: Contact, Params: { id: string }}>('/:id', async (req, reply) => {
    const { id } = req.params;
    const { name, email, phone } = req.body;

    try {
      const data = await contactUseCase.updateContact({ id, name, email, phone });
      return data;

    } catch (error) {
      console.log(error)
      reply.send(error)
    }
  });

  fastify.delete<{Params: { id: string }}>('/:id', async (req, reply) => {
    const { id } = req.params;

    try {
      const data = await contactUseCase.delete(id);
      return data;

    } catch (error) {
      console.log(error)
      reply.send(error)
    }
  })

}