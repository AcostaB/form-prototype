export class Person implements IPerson {
  public name: string;
  public age: number;
  public dateOfBirth: string;
  public gender: string;
  public email: string; // TODO: this could potentially have validation at the type level.

  constructor(name: string, age: number, dateOfBirth: string, gender: string, email: string) {
    this.name = name;
    this.age = age;
    this.dateOfBirth = dateOfBirth;
    this.gender = gender;
    this.email = email;
  }
} 