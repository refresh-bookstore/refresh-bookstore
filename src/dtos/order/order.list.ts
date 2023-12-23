import { Product } from "@prisma/client";

export class OrderList {
  title: string;
  author: string;
  publisher: string;
  isbn: string;
  price: number;
  imagePath: string;
  amount: number;

  constructor(product: Product, amount: number) {
    this.title = product.title;
    this.author = product.author;
    this.publisher = product.publisher;
    this.isbn = product.isbn;
    this.price = product.price;
    this.imagePath = product.imagePath;
    this.amount = amount;
  }
}
