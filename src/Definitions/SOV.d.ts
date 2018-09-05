interface IAddress {
  id: number;
  addressID: number;
  line1: string;
  line2: string;
  city: string;
  state: string;
  zip: string;
}

interface IBuilding {
  id: number;
  buildingID: number;
  locationName: string;
  buildingName: string;
  streetNumber?: number;
  address?: IAddress;
  isPropertyWithin1000FeetOfWater: true,
  numberOfBuildings: number,
  isoConstructionCode: string,
  numberOfStories: number,
  originallyBuilt: number,
  wiring: number,
  plumbing: number,
  heating: number,
  totalTiv: number,
  basement: string,
  shapeOfRoof: string
}

interface ILocation {
  id: number,
  locationID: number,
  locationName: string,
  address: IAddress,
  buildings: IBuilding[]
}

interface ISOVFormEntities extends INormalizedEntities {
  addresses?: Keyed<Normalized<IAddress>>;
  buildings?: Keyed<Normalized<IBuilding>>;
  locations?: Keyed<Normalized<ILocation>>;
}

interface ISOVFormErrors extends INormalizedErrors {
  addresses?: Keyed<Errors<IAddress>>;
  buildings?: Keyed<Errors<IBuilding>>;
  locations?: Keyed<Errors<ILocation>>;
}
