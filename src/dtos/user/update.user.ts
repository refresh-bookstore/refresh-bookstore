import { IsOptional } from "class-validator";

export class UpdateUser {
  @IsOptional()
  password?: string;

  @IsOptional()
  postalCode?: string;

  @IsOptional()
  address?: string;

  @IsOptional()
  detailAddress?: string | null;

  @IsOptional()
  phone?: string;
}
