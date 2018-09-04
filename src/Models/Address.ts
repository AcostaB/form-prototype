import { newUniqueID } from "../Utils/Utils";

export class Address implements IAddress {
  public addressID: number;
  public line1: string;
  public line2: string;
  public city: string;
  public state: string;
  public zip: string;

  constructor() {
    this.addressID = newUniqueID();
    this.line1 = "";
    this.line2 = "";
    this.city = "";
    this.state = "";
    this.zip = "";
  }
}

export class AddressNormalized implements Normalized<IAddress> {
  public addressID: number;
  public line1: string;
  public line2: string;
  public city: string;
  public state: string;
  public zip: string;

  constructor() {
    this.addressID = newUniqueID();
    this.line1 = "";
    this.line2 = "";
    this.city = "";
    this.state = "";
    this.zip = "";
  }
}