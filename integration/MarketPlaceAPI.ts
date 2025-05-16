import axios from "axios";
import {CategoryResponse} from "./CategoryResponse";
import {CategoryAllowanceResponse} from "./CategoryAllowanceResponse";


export class MarketPlaceAPI {

  public static async isCategoryAllowed(categoryName: string): Promise<CategoryResponse> {
    let response = await axios.get(`https://posdesweb.igormaldonado.com.br/api/allowedCategory?category=${categoryName.toLowerCase()}`)
    let allowance: CategoryAllowanceResponse = response.data
    console.log(`Category ${categoryName} allowed?: ${allowance.allowed}`);
    return {category: categoryName, allowed: allowance.allowed};
  }
}