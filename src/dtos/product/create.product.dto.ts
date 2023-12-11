export class CreateProductDto {
  title: string;
  author: string;
  publisher: string;
  publicationDate: Date;
  isbn: string;
  description: string;
  price: number;
  imagePath: string;
  categoryId: number;
}
