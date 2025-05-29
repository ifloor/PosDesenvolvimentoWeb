```
import Fastify from 'fastify';
import fastifyMultipart from '@fastify/multipart';
import fs from 'fs';
import path from 'path';

const fastify = Fastify({ logger: true });

// Registre o plugin
fastify.register(fastifyMultipart);

// Defina o endpoint POST para upload de arquivos
fastify.post('/upload', async (request, reply) => {
  const data = await request.file(); // Obtém o arquivo enviado
  const uploadPath = path.join(__dirname, 'uploads', data.filename);

  // Salva o arquivo no sistema de arquivos
  await new Promise((resolve, reject) => {
    const writeStream = fs.createWriteStream(uploadPath);
    data.file.pipe(writeStream);
    data.file.on('end', resolve);
    data.file.on('error', reject);
  });

  reply.send({ message: 'Arquivo recebido com sucesso!', filename: data.filename });
});

```