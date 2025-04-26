
import {ProductCategory} from "skeleton/dist/types";

const world = 'world';

export function hello(who: string = world): string {
  return `Hello ${who}! `;
}

console.log(hello());

const a: ProductCategory = ProductCategory.Moda;