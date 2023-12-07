import { IsUUID, IsString } from "class-validator";

export class Category {
  @IsString()
  name: string;

  @IsUUID()
  categoryId: string;
}
