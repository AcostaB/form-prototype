import { newUniqueID } from "../Utils/Utils";

export class Apartment implements IApartment {
  public apartmentID: number;
  public apartmentNumber: number;
  public tenants: IPerson[];

  constructor() {
    this.apartmentID = newUniqueID();
    this.apartmentNumber = 0;
    this.tenants = [];
  }
}

export class ApartmentNormalized implements Normalized<IApartment> {
  public apartmentID: number;
  public apartmentNumber: number;
  public tenants: number[];

  constructor() {
    this.apartmentID = newUniqueID();
    this.apartmentNumber = 0;
    this.tenants = [];
  }
}
