import { IsUUID, IsString } from "class-validator";

export class CategoryDTO {
  @IsString()
  name: string;

  @IsUUID()
  categoryId: string;
}
