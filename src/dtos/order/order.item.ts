import { IsISBN, IsNotEmpty } from "class-validator";

export class OrderItem {
  @IsNotEmpty()
  @IsISBN()
  ISBN: string;

  @IsNotEmpty()
  amount: number;
}
