import { Normalized, Keyed, Errors } from './main';
import { NormalizedEntities, NormalizedErrors } from './main';
import { Person } from '../Models/Person';
import { Building } from '../Models/Building';
import { Apartment } from '../Models/Apartment';
import { Address } from '../Models/Address';

export interface LocationFormEntities extends NormalizedEntities {
  addresses?: Keyed<Normalized<Address>>;
  buildings?: Keyed<Normalized<Building>>;
  locations?: Keyed<Normalized<Location>>;
}

export interface LocationFormErrors extends NormalizedErrors {
  addresses?: Keyed<Errors<Address>>;
  buildings?: Keyed<Errors<Building>>;
  locations?: Keyed<Errors<Location>>;
}
