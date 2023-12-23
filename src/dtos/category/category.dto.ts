import { IsOptional, IsString, Length } from "class-validator";

export class CategoryDTO {
  @IsString()
  @IsOptional()
  @Length(1, 10)
  name?: string;
}
