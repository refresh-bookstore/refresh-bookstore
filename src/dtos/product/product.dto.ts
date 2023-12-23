import { IsISBN, IsOptional, IsString } from "class-validator";

export class ProductDTO {
  @IsString()
  title: string;

  @IsString()
  author: string;

  @IsString()
  publisher: string;

  publicationDate: Date;

  @IsISBN()
  isbn: string;

  @IsString()
  description: string;

  price: number;

  @IsOptional()
  stock?: number = 0;

  @IsString()
  imagePath: string;

  @IsString()
  category: string;
}
