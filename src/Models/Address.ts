import { newUniqueID } from "../Utils/Utils";
import { Normalized } from "../Definitions/main";

export class Address {
  public id: number = newUniqueID();
  public addressID: number = newUniqueID();
  public line1: string = '';
  public line2: string = '';
  public city: string = '';
  public state: string = '';
  public zip: string = '';
}

export class AddressNormalized implements Normalized<Address> {
  public id: number = newUniqueID();
  public addressID: number = newUniqueID();
  public line1: string = '';
  public line2: string = '';
  public city: string = '';
  public state: string = '';
  public zip: string = '';
}
