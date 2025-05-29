import {FastifyInstance} from "fastify";
import {ProductRepository} from "../database/ProductRepository";
import {GetAll} from "./endpoints/product/GetAll";
import {GetById} from "./endpoints/product/GetById";
import {CreateNew} from "./endpoints/product/CreateNew";

export class RestLayer {
  static wire(fastify: FastifyInstance, productRepository: ProductRepository) {
    GetAll.wire(fastify, productRepository);
    GetById.wire(fastify, productRepository);
    CreateNew.wire(fastify, productRepository);
  }
}