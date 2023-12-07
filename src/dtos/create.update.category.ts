import { IsString } from "class-validator";

export class CreateUpdateCategory {
  @IsString()
  name: string;
}
