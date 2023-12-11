import { IsOptional, Length } from "class-validator";

export class UpdateUser {
  @IsOptional()
  @Length(1, 255)
  password?: string;

  @IsOptional()
  @Length(1, 20)
  postalCode?: string;

  @IsOptional()
  @Length(1, 255)
  address?: string;

  @IsOptional()
  @Length(1, 255)
  detailAddress?: string | null;

  @IsOptional()
  @Length(1, 20)
  phone?: string;
}
