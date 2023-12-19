import { Product } from "@prisma/client";

export class ProductResponse {
  title: string;
  author: string;
  publisher: string;
  publicationDate: Date;
  isbn: string;
  description: string;
  price: number;
  stock: number;
  imagePath: string;
  category: string;

  constructor(product: Product, category: string) {
    this.title = product.title;
    this.author = product.author;
    this.publisher = product.publisher;
    this.publicationDate = product.publicationDate;
    this.isbn = product.isbn;
    this.description = product.description;
    this.price = product.price;
    this.stock = product.stock;
    this.imagePath = product.imagePath;
    this.category = category;
  }
}
