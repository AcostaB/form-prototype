const testa: Normalized<IPerson> = {
  personID: 12,
  age: 123,
  dateOfBirth: "test",
  email: "test",
  gender: "test",
  name: "test"
};

const test2: Normalized<IApartment> = {
  apartmentID: 12,
  apartmentNumber: 123,
  tenants: [687, 7987]
};

const test3: Keyed<Normalized<IApartment>> = {
  1: {
    apartmentID: 12,
    apartmentNumber: 123,
    tenants: [687, 7987]
  }
};

const test4: Normalized<IDemoBuilding> = {
  buildingID: 12,
  name: "test",
  // TODO this did not inherit the restrictions.
  construction: "something else",
  website: "test",
  address: 67,
  apartments: [12]
}