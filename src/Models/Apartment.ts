import { newUniqueID } from "../Utils/Utils";
import { Person } from '../Models/Person';
import { Normalized } from "../Definitions/main";

export class Apartment {
  public apartmentID: number = newUniqueID();
  public apartmentNumber: number = 0;
  public tenants: Person[] = [];
}

export class ApartmentNormalized implements Normalized<Apartment> {
  public apartmentID: number = newUniqueID();
  public apartmentNumber: number = 0;
  public tenants: number[] = [];
}
