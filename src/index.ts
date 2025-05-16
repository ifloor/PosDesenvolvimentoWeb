import {InitialLoader} from "../marketplace/productsLoad/InitialLoader";

async function run() {
  let allProducts = await InitialLoader.loadInitialData();
  let allowedProducts = await InitialLoader.filterOutNotAllowedCategories(allProducts)
  console.log("Allowed products: ", allowedProducts);
}

run().then(_ => {console.log("Finished")}).catch(e => {console.error("Error: ", e)});