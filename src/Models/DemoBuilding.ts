import { newUniqueID } from "../Utils/Utils";

export class DemoBuilding implements IDemoBuilding {
  public buildingID: number;
  public name: string;
  public construction: "wood" | "concrete" | "";
  public website: string;
  public address: IAddress;
  public apartments: IApartment[];

  constructor() {
    this.buildingID = newUniqueID();
    this.name = "";
    this.construction = "";
    this.website = "";
  }
}

export class DemoBuildingNormalized implements Normalized<IDemoBuilding> {
  public buildingID: number;
  public name: string;
  public construction: "wood" | "concrete" | "";
  public website: string;
  public address: number;
  public apartments: number[];

  constructor() {
    this.buildingID = newUniqueID();
    this.name = "";
    this.construction = "";
    this.website = "";
  }
}
