import fs from "node:fs";
import {ProductFromFile} from "./ProductFromFile";
import {MarketPlaceAPI} from "../../integration/MarketPlaceAPI";
import {CategoryResponse} from "../../integration/CategoryResponse";

export class InitialLoader {
  public static async loadInitialData(): Promise<ProductFromFile[]> {
    return new Promise((resolve, reject) => {
      fs.readFile('base/products.json', 'utf-8', (err, productsRaw) => {
        if (err) {
          console.error("Error reading file:", err);
          reject(err)
          return;
        }

        try {
          const productsFromFile: ProductFromFile[] = JSON.parse(productsRaw);
          resolve(productsFromFile);
        } catch (parseError) {
          console.error("Error parsing JSON:", parseError);
          reject(parseError);
        }
      });
    });
  }

  public static async filterOutNotAllowedCategories(products: ProductFromFile[]): Promise<ProductFromFile[]> {
    let categoriesToCheck = new Set<string>();

    products.forEach(product => {
      categoriesToCheck.add(product.category);
    });

    let waitResponses: Promise<CategoryResponse>[] = [];
    for (const category of categoriesToCheck) {
      waitResponses.push(MarketPlaceAPI.isCategoryAllowed(category));
    }

    let responses = await Promise.all(waitResponses);
    let allowedCategories = new Set<string>();
    responses.forEach((response: CategoryResponse) => {
      if (response.allowed) {
        allowedCategories.add(response.category);
      }
    });

    return products.filter(product => {
      return allowedCategories.has(product.category);
    });
  }
}