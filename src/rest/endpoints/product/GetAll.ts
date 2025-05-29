import fastify, {FastifyInstance} from "fastify";
import {ProductRepository} from "../../../database/ProductRepository";
import {Models} from "./Models";

export class GetAll {
  private static opts = {
    schema: {
      response: {
        200: Models.ProductsResponseSchema,
      },
    },
  };

  public static wire(fastify: FastifyInstance, productRepository: ProductRepository) {
    fastify.get('/api/product', GetAll.opts, async (request: any, reply: any) => {
      reply.send(productRepository.getAll());
    });
  }
}