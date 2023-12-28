import { ProductResponse } from "./product.response";

export class ProductPaginationResult {
  data: ProductResponse[];
  total: number;

  constructor(data: ProductResponse[], total: number) {
    this.data = data;
    this.total = total;
  }
}
