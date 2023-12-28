import { IsNumber, IsOptional, IsString, Max, Min } from "class-validator";

export class GetProductsParams {
  @IsNumber()
  @Min(1)
  page: number;

  @IsNumber()
  @Min(1)
  @Max(100)
  limit: number;

  @IsString()
  @IsOptional()
  searchTerm?: string;

  @IsString()
  @IsOptional()
  isbn?: string;
}
