export class Person implements IPerson {
  public name: string;
  public age: number;
  public dateOfBirth: string;
  public gender: string;

  constructor(name: string, age: number, dateOfBirth: string, gender: string) {
    this.name = name;
    this.age = age;
    this.dateOfBirth = dateOfBirth;
    this.gender = gender;
  }
} 