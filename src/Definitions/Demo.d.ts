import { NormalizedEntities, NormalizedErrors } from './main';

export interface DemoFormEntities extends NormalizedEntities {
  people?: Keyed<Normalized<IPerson>>;
  buildings?: Keyed<Normalized<IBuilding>>;
  apartments?: Keyed<Normalized<IApartment>>;
}

export interface DemoFormErrors extends NormalizedErrors {
  people?: Keyed<Errors<IPerson>>;
  buildings?: Keyed<Errors<IBuilding>>;
  apartments?: Keyed<Errors<IApartment>>;
}
