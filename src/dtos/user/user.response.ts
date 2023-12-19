import { User } from "@prisma/client";
import { IsNotEmpty, IsOptional, IsEmail, Length } from "class-validator";

export class UserResponse {
  @IsNotEmpty()
  @Length(1, 50)
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @Length(1, 100)
  email: string;

  @IsNotEmpty()
  @Length(1, 20)
  postalCode: string;

  @IsNotEmpty()
  @Length(1, 255)
  address: string;

  @IsOptional()
  @Length(1, 255)
  detailAddress?: string;

  @IsNotEmpty()
  @Length(1, 20)
  phone: string;

  @IsNotEmpty()
  createdAt: Date;

  constructor(user: User) {
    this.name = user.name;
    this.email = user.email;
    this.postalCode = user.postalCode;
    this.address = user.address;
    this.detailAddress = user.detailAddress;
    this.phone = user.phone;
    this.createdAt = user.createdAt;
  }
}
