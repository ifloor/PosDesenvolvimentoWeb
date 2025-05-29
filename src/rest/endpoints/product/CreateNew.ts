import fastify, {FastifyInstance} from "fastify";
import {ProductRepository} from "../../../database/ProductRepository";
import {Models} from "./Models";
import {Models as RawModel}  from "../Models";
import {KnownCategories}  from "../../../index";

interface CreateNewBody {
  name: string;
  description: string;
  price: number;
  category: string;
  pictureUrl: string;
}

export class CreateNew {
  private static opts = {
    schema: {
      body: {
        type: "object",
        properties: {
          name: { type: "string" },
          description: { type: "string" },
          price: { type: "number" },
          category: { type: "string" },
          pictureUrl: { type: "string" },
        },
        required: ["name", "description", "price", "category", "pictureUrl"],
      },
      response: {
        200: Models.ProductResponseSchema,
        400: RawModel.ErrorResponseSchema,
      },
    },
  };

  public static wire(fastify: FastifyInstance, productRepository: ProductRepository) {
    fastify.post<{Body: CreateNewBody}>('/api/product', CreateNew.opts, async (request: any, reply: any) => {
      const category = request.body.category;
      if (!KnownCategories.has(category)) {
        reply.status(400).send({
          // status: 400,
          message: `Category '${category}' is not recognized. Valid categories are: [${Array.from(KnownCategories).join(', ')}]`
        });
      }

      const newProduct = productRepository.saveNew(request.body);

      reply.send(newProduct);
    });
  }
}