export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  postalCode: string;
  address: string;
  detailAddress?: string;
  phone: string;
  isAdmin: boolean;
}
