import Fastify from 'fastify';
import cors from '@fastify/cors';
import jwt from '@fastify/jwt';

const jwtSecret = process.env.JWT_SECRET || '';

import { userRoutes } from './routes/user.routes';
import { gameRoutes } from './routes/game.routes';
import { guessRoutes } from './routes/guess.routes';
import { poolRoutes } from './routes/pool.routes';
import { authRoutes } from './routes/auth.routes';

async function bootstrap() {
  const fastify = Fastify({
    logger: true,
  });

  await fastify.register(cors, {
    origin: true,
  });

  await fastify.register(jwt, {
    secret: jwtSecret,
  });

  await fastify.register(authRoutes);
  await fastify.register(gameRoutes);
  await fastify.register(guessRoutes);
  await fastify.register(poolRoutes);
  await fastify.register(userRoutes);

  await fastify.listen({
    port: 3333,
    host: '0.0.0.0',
  });
}

bootstrap();
