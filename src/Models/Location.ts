import { Building } from './Building';
import { Address } from "./Address";
import { Normalized } from '../Definitions/main';
import { newUniqueID } from '../Utils/Utils';

export class Location {
  public id: number = newUniqueID();
  public locationNum: number = 1;
  public locationName: string = '';
  public address: Address | null = null;
  public buildings: Building[] = [];
}

export class NormalizedLocation implements Normalized<Location> {
  public id: number = newUniqueID();
  public locationNum: number = 1;
  public locationName: string = '';
  public address: number | null = null;
  public buildings: number[] = [];
}