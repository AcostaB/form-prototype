interface IPerson {
  personID: number;
  age: number;
  dateOfBirth: string;
  email: string;
  gender: string;
  name: string;
}

// interface IAddress {
//   addressID: number;
//   line1: string;
//   line2: string;
//   city: string;
//   state: string;
//   zip: string;
// }

interface IApartment {
  apartmentID: number;
  apartmentNumber: number;
  tenants: IPerson[];
}

interface IDemoBuilding {
  buildingID: number;
  name: string;
  construction: "wood" | "concrete" | "";
  website: string;
  address?: IAddress;
  apartments?: IApartment[];
}

interface IDemoFormEntities extends INormalizedEntities {
  people?: Keyed<Normalized<IPerson>>;
  buildings?: Keyed<Normalized<IDemoBuilding>>;
  apartments?: Keyed<Normalized<IApartment>>;
}

interface IDemoFormErrors extends INormalizedErrors {
  people?: Keyed<Errors<IPerson>>;
  buildings?: Keyed<Errors<IDemoBuilding>>;
  apartments?: Keyed<Errors<IApartment>>;
}
