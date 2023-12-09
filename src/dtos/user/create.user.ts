import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateUser {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  postalCode: string;

  @IsNotEmpty()
  address: string;

  @IsOptional()
  detailAddress?: string;

  @IsNotEmpty()
  phone: string;
}
