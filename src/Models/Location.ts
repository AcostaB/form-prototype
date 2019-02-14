import { Building } from './Building';
import { Address } from "./Address";
import { Normalized } from '../Definitions/main';

export class Location {
  public id: number = 0;
  public locationID: number = 0;
  public locationName: string = '';
  public address: Address | null = null;
  public buildings: Building[] = [];
}

export class NormalizedLocation implements Normalized<Location> {
  public id: number = 0;
  public locationID: number = 0;
  public locationName: string = '';
  public address: number | null = null;
  public buildings: number[] = [];
}