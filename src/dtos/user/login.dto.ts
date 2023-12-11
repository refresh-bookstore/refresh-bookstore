import { Length, IsEmail, IsNotEmpty } from "class-validator";

export class LoginDTO {
  @IsNotEmpty()
  @IsEmail()
  @Length(1, 100)
  email: string;

  @IsNotEmpty()
  @Length(1, 255)
  password: string;
}
