import Fastify from 'fastify';
import fastifyMultipart from '@fastify/multipart';
import fs from 'fs';
import path from 'path';

const fastify = Fastify({ logger: true });

fastify.register(fastifyMultipart);

fastify.post('/upload', async (request, reply) => {
  const data: any = await request.file();
  const uploadPath = path.join(__dirname, 'uploads', data.filename);

  await new Promise((resolve, reject) => {
    const writeStream = fs.createWriteStream(uploadPath);
    data.file.pipe(writeStream);
    data.file.on('end', resolve);
    data.file.on('error', reject);
  });

  reply.send({ message: 'Arquivo recebido com sucesso!', filename: data.filename });
});


