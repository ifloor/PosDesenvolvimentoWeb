export class Models {
  public static ErrorResponseSchema = {
    type: "object",
    properties: {
      message: { type: "string" },
    },
    required: ["message"],
  };
}