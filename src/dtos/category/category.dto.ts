import { IsOptional, IsString, IsUUID, Length } from "class-validator";

export class CategoryDTO {
  @IsString()
  @IsOptional()
  @Length(1, 10)
  name?: string;

  @IsUUID()
  @IsOptional()
  categoryId?: string;
}
