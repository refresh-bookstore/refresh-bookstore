import { IsOptional } from "class-validator";

export class ProductDTO {
  title: string;

  author: string;

  publisher: string;

  publicationDate: Date;

  isbn: string;

  description: string;

  price: number;

  @IsOptional()
  stock?: number = 0;

  imagePath: string;

  category: string;
}
