import { newUniqueID } from '../Utils/Utils';
import { Address } from './Address';
import { Apartment } from './Apartment';
import { Normalized } from '../Definitions/main';

export class Building {
  public buildingID: number = newUniqueID();
  public name: string = '';
  public construction: 'wood' | 'concrete' | '' = '';
  public website: string = '';
  public address: Address | null = null;
  public apartments: Apartment[] | null = null;
}

export class BuildingNormalized implements Normalized<Building> {
  public buildingID: number = newUniqueID();
  public name: string = '';
  public construction: 'wood' | 'concrete' | '' = '';
  public website: string = '';
  public address: number | null = null;
  public apartments: number[] | null = null;
}