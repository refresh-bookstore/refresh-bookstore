import { ProductResponse } from "./product.response";

export class GetProductsResult {
  data: ProductResponse[];
  total: number;
  page: number;
  limit: number;
}
