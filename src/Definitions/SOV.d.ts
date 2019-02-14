import { NormalizedEntities, NormalizedErrors } from './main';

export interface ISOVFormEntities extends NormalizedEntities {
  addresses?: Keyed<Normalized<IAddress>>;
  buildings?: Keyed<Normalized<IBuilding>>;
  locations?: Keyed<Normalized<ILocation>>;
}

export interface ISOVFormErrors extends NormalizedErrors {
  addresses?: Keyed<Errors<IAddress>>;
  buildings?: Keyed<Errors<IBuilding>>;
  locations?: Keyed<Errors<ILocation>>;
}
