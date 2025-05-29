import {ProductFromFile} from "../marketplace/productsLoad/ProductFromFile";

interface NewProduct {
  name: string;
  description: string;
  price: number;
  category: string;
  pictureUrl: string;
}

export class ProductRepository {
  private products: Array<ProductFromFile> = [];
  private biggerId = 0;

  private constructor() {}

  public getAll(): ProductFromFile[] {
    return this.products;
  }

  public getById(id: string): ProductFromFile | undefined {
    for (let p = this.products.length - 1; p >= 0; p--) {
      if (this.products[p].id === id) {
        return this.products[p];
      }
    }

    return undefined;
  }

  public saveNew(newProduct: NewProduct): ProductFromFile {
    const productToAdd: ProductFromFile = {
      id: (this.biggerId + 1).toString(),
      name: newProduct.name,
      description: newProduct.description,
      price: newProduct.price,
      category: newProduct.category,
      pictureUrl: newProduct.pictureUrl,
    }

    this.products.push(productToAdd);

    this.biggerId = (this.biggerId + 1);

    return productToAdd;
  }

  static dumb(products: ProductFromFile[]): ProductRepository {
    const repository = new ProductRepository();
    repository.products = products;
    repository.biggerId = products.reduce((max, product) => Math.max(max, parseInt(product.id)), 0);


    return repository
  }
}