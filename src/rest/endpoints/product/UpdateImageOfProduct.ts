import {Models as RawModel} from "../Models";
import {FastifyInstance} from "fastify";
import {ProductRepository} from "../../../database/ProductRepository";
import path from "path";
import fs from "fs";

interface GetByIdParams {
  id: string; // Define the type for the path parameter
}

interface UpdateExistingBody {
  name: string;
  description: string;
  price: number;
  category: string;
  pictureUrl: string;
}

export class UpdateImageOfProduct {
  private static opts = {
    schema: {
      consumes: ['multipart/form-data'],
      response: {
        400: RawModel.ErrorResponseSchema,
      },
    },
  };

  public static wire(fastify: FastifyInstance, productRepository: ProductRepository) {
    fastify.put<{Params: GetByIdParams, Body: UpdateExistingBody}>('/api/product/:id/image', UpdateImageOfProduct.opts, async (request: any, reply: any) => {
      const {id} = request.params;
      let productFromDB = productRepository.getById(id);
      if (!productFromDB) { // Product not found
        reply.status(404).send({ error: 'Product not found' });
        return;
      }

      const data: any = await request.file();
      const basePath = path.join(__dirname, "../../../../", 'uploads');
      const uploadPath = path.join(basePath, `${id}.jpeg`);

      await new Promise((resolve, reject) => {
        const writeStream = fs.createWriteStream(uploadPath);
        data.file.pipe(writeStream);
        data.file.on('end', resolve);
        data.file.on('error', reject);
      });

      const message = `Product with id [${id}] updated successfully`;
      reply.send({ message: message });
    });
  }
}