import {FastifyInstance} from "fastify";
import {ProductRepository} from "../../../database/ProductRepository";
import {Models as RawModel} from "../Models";

interface GetByIdParams {
  id: string; // Define the type for the path parameter
}

export class DeleteExisting {
  private static opts = {
    schema: {
      response: {
        204: {},
        400: RawModel.ErrorResponseSchema,
      },
    },
  };

  public static wire(fastify: FastifyInstance, productRepository: ProductRepository) {
    fastify.delete<{Params: GetByIdParams}>('/api/product/:id', DeleteExisting.opts, async (request: any, reply: any) => {
      const {id} = request.params;
      let productFromDB = productRepository.getById(id);
      if (!productFromDB) { // Product not found
        reply.status(404).send({ error: 'Product not found' });
        return;
      }

      productRepository.deleteById(id);

      reply.status(204).send();
    });
  }
}