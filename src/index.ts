import {InitialLoader} from "./marketplace/productsLoad/InitialLoader";
import Fastify from 'fastify'
import {RestLayer} from "./rest/RestLayer";
import {ProductRepository} from "./database/ProductRepository";
import fastifyMultipart from '@fastify/multipart';


export const KnownCategories: Set<string> = new Set();

async function run() {
  let allProducts = await InitialLoader.loadInitialData();
  let allowedProducts = await InitialLoader.filterOutNotAllowedCategories(allProducts)
  console.log("Allowed products: ", allowedProducts);
  for (let product = allowedProducts.length - 1; product >= 0; product--) {
    KnownCategories.add(allowedProducts[product].category);
  }

  const productRepository = ProductRepository.dumb(allowedProducts);

  const fastify = Fastify({ logger: true });
  fastify.register(fastifyMultipart);
  fastify.addHook('onRequest', (request, reply, done) => {
    console.log(`Received request: ${request.method} ${request.url}`);
    done();
  });

  RestLayer.wire(fastify, productRepository);

  // Start the server
  const start = async () => {
    try {
      await fastify.listen({ port: 3001,  });
      console.log('Server is running on http://localhost:3001');
    } catch (err) {
      fastify.log.error(err);
      process.exit(1);
    }
  };

  start().then(r => {
  console.log("Server started successfully");
});
}

run().then(_ => {console.log("Finished")}).catch(e => {console.error("Error: ", e)});
