import { newUniqueID } from "../Utils/Utils";

export class Person {
  public personID: number;
  public age: number;
  public dateOfBirth: string;
  public email: string;
  public gender: string;
  public name: string;

  constructor() {
    this.personID = newUniqueID();
    this.age = 0;
    this.dateOfBirth = "";
    this.email = "";
    this.gender = "";
    this.name = "";
  }
}
