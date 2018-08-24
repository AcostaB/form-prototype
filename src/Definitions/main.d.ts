interface IPerson {
  personID: number,
  age: number,
  dateOfBirth: string,
  email: string,
  gender: string,
  name: string
}

interface IPersonNormalized extends IPerson { }

interface IAddress {
  addressID: number,
  line1: string,
  line2: string,
  city: string,
  state: string,
  zip: string
}

interface IAddressNormalized extends IAddress { }

interface IApartment {
  apartmentID: number,
  apartmentNumber: number,
  tenants: IPerson[]
}

interface IApartmentNormalized {
  apartmentID: number,
  apartmentNumber: number,
  tenants: number[]
}

interface IBuilding {
  buildingID: number,
  name: string,
  construction: ("wood" | "concrete"),
  website: string,
  address: IAddress,
  apartments: IApartment[]
}

interface IBuildingNormalized {
  buildingID: number,
  name: string,
  construction: ("wood" | "concrete"),
  website: string,
  address: number,
  apartments: number[]
}

// TODO: improve on this so its non function properties only
type Key<T> = keyof T;

type Keyed<T> = { [id: number]: T };

// type KeyedErrors<T> = { [K in keyof T]?: string[] | null | undefined };

type Validator = (...param: any[]) => string | null | undefined;

// TODO improve on this. this should only constitute of primitive values (no objects or arrays), no functions 
type Errors<T> = { [K in keyof T]?: string[] };
// TODO: this could potentially be a type
// type DogFormChangeHandler<T> = 

// TODO: this could be a generic
interface IFieldChange {
  entity: string,
  id: number,
  fieldName: string,
  newValue: any
}
