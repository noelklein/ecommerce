import { Address } from './address';

export class Customer {
  public customerId: number;
  public email: string;
  public firstName: string;
  public lastName: string;
  public phoneNumber: string;
  public addresses: Address[];
}
