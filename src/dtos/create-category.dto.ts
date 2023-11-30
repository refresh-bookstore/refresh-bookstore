import { IsString, Length } from "class-validator";

export class CreateCategoryDto {
  @IsString()
  @Length(2, 20)
  name: string;
}
