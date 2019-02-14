import { Person } from '../Models/Person';
import { Apartment } from '../Models/Apartment';
import { Building } from '../Models/Building';
import { Normalized, Keyed } from './main';

const testa: Normalized<Person> = {
  personID: 12,
  age: 123,
  dateOfBirth: "test",
  email: "test",
  gender: "test",
  name: "test"
};

const test2: Normalized<Apartment> = {
  apartmentID: 12,
  apartmentNumber: 123,
  tenants: [687, 7987]
};

const test3: Keyed<Normalized<Apartment>> = {
  1: {
    apartmentID: 12,
    apartmentNumber: 123,
    tenants: [687, 7987]
  }
};

const test4: Normalized<Building> = {
  buildingID: 12,
  name: "test",
  // TODO this did not inherit the restrictions.
  construction: "something else",
  website: "test",
  address: 67,
  apartments: [12]
}