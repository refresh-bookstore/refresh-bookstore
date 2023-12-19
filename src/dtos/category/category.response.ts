import { Category } from "@prisma/client";
import { IsUUID, IsString, Length, IsOptional } from "class-validator";

export class CategoryResponse {
  @IsString()
  @IsOptional()
  @Length(1, 10)
  name?: string;

  @IsUUID()
  @IsOptional()
  categoryId?: string;

  constructor(category: Category) {
    this.name = category.name;
    this.categoryId = category.categoryId;
  }
}
