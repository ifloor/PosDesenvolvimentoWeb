import fastify, {FastifyInstance} from "fastify";
import {ProductRepository} from "../../../database/ProductRepository";
import {Models} from "./Models";

interface GetByIdParams {
  id: string; // Define the type for the path parameter
}

export class GetById {
  private static opts = {
    schema: {
      params: {
        type: "object",
        properties: {
          id: { type: "string" },
        },
        required: ["id"]
      },
      response: {
        200: Models.ProductResponseSchema,
      },
    },
  };

  public static wire(fastify: FastifyInstance, productRepository: ProductRepository) {
    fastify.get<{Params: GetByIdParams}>('/api/product/:id', GetById.opts, async (request: any, reply: any) => {
      const {id} = request.params;
      const productFromDb = productRepository.getById(id);

      if (!productFromDb) {
        reply.status(404).send({ error: 'Product not found' });
        return;
      }

      reply.send(productFromDb);
    });
  }
}