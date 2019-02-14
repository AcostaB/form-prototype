import { Normalized, Keyed, Errors } from './main';
import { NormalizedEntities, NormalizedErrors } from './main';
import { Person } from '../Models/Person';
import { Building } from '../Models/Building';
import { Apartment } from '../Models/Apartment';

export interface DemoFormEntities extends NormalizedEntities {
  people?: Keyed<Normalized<Person>>;
  buildings?: Keyed<Normalized<Building>>;
  apartments?: Keyed<Normalized<Apartment>>;
}

export interface DemoFormErrors extends NormalizedErrors {
  people?: Keyed<Errors<Person>>;
  buildings?: Keyed<Errors<Building>>;
  apartments?: Keyed<Errors<Apartment>>;
}
