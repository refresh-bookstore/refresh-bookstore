import { IsOptional } from "class-validator";

export class UpdateProduct {
  title: string;

  author: string;

  publisher: string;

  publicationDate: Date;

  isbn: string;

  description: string;

  price: number;

  @IsOptional()
  stock?: number = 0;

  @IsOptional()
  imagePath?: string;

  category: string;
}
