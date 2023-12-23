import { ShippingStatus } from "@prisma/client";
import { IsOptional } from "class-validator";

export class UpdateOrder {
  @IsOptional()
  recipientName?: string;

  @IsOptional()
  postalCode?: string;

  @IsOptional()
  address?: string;

  @IsOptional()
  addressDetail?: string;

  @IsOptional()
  contact?: string;

  @IsOptional()
  deliveryRequest?: string;

  @IsOptional()
  shippingStatus?: ShippingStatus;
}
