import {FastifyInstance} from "fastify";
import {ProductRepository} from "../database/ProductRepository";
import {GetAll} from "./endpoints/product/GetAll";
import {GetById} from "./endpoints/product/GetById";
import {CreateNew} from "./endpoints/product/CreateNew";
import {UpdateExisting} from "./endpoints/product/UpdateExisting";
import {DeleteExisting} from "./endpoints/product/DeleteExisting";
import {UpdateImageOfProduct} from "./endpoints/product/UpdateImageOfProduct";

export class RestLayer {
  static wire(fastify: FastifyInstance, productRepository: ProductRepository) {
    GetAll.wire(fastify, productRepository);
    GetById.wire(fastify, productRepository);
    CreateNew.wire(fastify, productRepository);
    UpdateExisting.wire(fastify, productRepository);
    DeleteExisting.wire(fastify, productRepository);
    UpdateImageOfProduct.wire(fastify, productRepository);
  }
}