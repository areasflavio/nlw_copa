import Fastify from 'fastify';

async function bootstrap() {
  const fastify = Fastify({
    logger: true,
  });

  fastify.get('/pools/count', () => {
    return {
      count: 1289,
    };
  });

  await fastify.listen({
    port: 3333,
  });
}

bootstrap();
