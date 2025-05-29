export class Models {
  public static ProductResponseSchema = {
    type: "object",
    properties: {
      id: { type: "number" },
      name: { type: "string" },
      description: { type: "string" },
      price: { type: "number" },
      category: { type: "string" },
      pictureUrl: { type: "string" },
    },
    required: ["id", "name", "description", "price", "category", "pictureUrl"],
  };

  public static ProductsResponseSchema = {
    type: "array",
    items: {
      ...Models.ProductResponseSchema
    },
  };
}