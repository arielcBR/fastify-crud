import { FastifyInstance } from 'fastify';
import { UserUseCase } from '../usecases/user.usecase';
import { UserCreate } from '../interfaces/users.interface';

export async function userRoutes(fastify: FastifyInstance) {
  const userUseCase = new UserUseCase()
  
  fastify.post<{Body: UserCreate}>('/', async (req, reply) => {
    const { name, email } = req.body
    
    try {
      const data = await userUseCase.create({
        name,
        email
      })

      return reply.send(data)

    } catch (error) {
      console.log(error)
      reply.send(error)
    }
  })

  fastify.get('/', (req, reply) => {

    try {
      reply.send({ hello: 'World'})
    } catch (error) {
      console.log(error)
      reply.send(error)
    }
  })
}