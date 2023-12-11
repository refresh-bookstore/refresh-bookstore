import { IsUUID, IsString, Length, IsOptional } from "class-validator";

export class CategoryDTO {
  @IsString()
  @IsOptional()
  @Length(1, 10)
  name?: string;

  @IsUUID()
  @IsOptional()
  categoryId?: string;
}
