import { IsNotEmpty, IsOptional, IsEmail, Length } from "class-validator";

export class CreateUser {
  @IsNotEmpty()
  @Length(1, 50)
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @Length(1, 100)
  email: string;

  @IsNotEmpty()
  @Length(1, 255)
  password: string;

  @IsNotEmpty()
  @Length(1, 20)
  postalCode: string;

  @IsNotEmpty()
  @Length(1, 255)
  address: string;

  @IsOptional()
  detailAddress?: string;

  @IsNotEmpty()
  @Length(1, 20)
  phone: string;
}
