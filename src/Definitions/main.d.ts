interface IPerson {
  personID: number,
  age: number,
  dateOfBirth: string,
  email: string,
  gender: string,
  name: string
}

interface IAddress {
  addressID: number,
  line1: string,
  line2: string,
  city: string,
  state: string,
  zip: string
}

interface IApartment {
  apartmentID: number,
  apartmentNumber: number,
  tenants: IPerson[]
}

interface IBuilding {
  buildingID: number,
  name: string,
  construction: ("wood" | "concrete" | ""),
  website: string,
  address: IAddress,
  apartments: IApartment[]
}

// Solution for issue with Array<Object>
// Obtained from: https://stackoverflow.com/questions/52105268/extends-arrayobject-not-working-as-expected-in-typescript
type NormalizeOne<T> =
  T extends number ? number :
  T extends string ? string :
  T extends number[] ? number[] :
  T extends string[] ? string[] :
  T extends Function ? never :
  T extends Array<Object> ? number[] :
  T extends Object ? number :
  T;  // not reached due to compiler issue

// Alternate solution from the same stack overflow answer:
// type NormalizeOne<T> =
//   [T] extends [number] ? number :
//   [T] extends [number | undefined] ? number | undefined :
//   [T] extends [string] ? string :
//   [T] extends [string | undefined] ? string | undefined :
//   [T] extends [number[]] ? number[] :
//   [T] extends [number[] | undefined] ? number[] | undefined :
//   [T] extends [string[]] ? string[] :
//   [T] extends [string[] | undefined] ? string[] | undefined :
//   [T] extends [Function] ? never :
//   [T] extends [Array<Object>] ? number[] :
//   [T] extends [Array<Object> | undefined] ? number[] | undefined :
//   [T] extends [Object] ? number :
//   T;  // not reached due to compiler issue

/**
 * Will convert the object to a normalized object similar to a table in a relational database.
 * Collection types like objects or arrays of objects will be mapped to 
 * a number or array of numbers, respectively. 
 */
type Normalized<T> = {
  [K in keyof T]: NormalizeOne<T[K]>;
};

/**
 * Indicates that a collection of objects have been keyed using a specified property, usually the ID.
 * A good example would be the keyBy method in the lodash api.
 */
type Keyed<T> = { [id: number]: T };

type Validator = (...param: any[]) => string | null | undefined;

/**
 * All string and number values are replaces with a string array. Functions and object arrays are ignored.
 */
type Errors<T> = { [K in keyof T]?:
  T[K] extends number ? string[] :
  T[K] extends string ? string[] :
  T[K] extends Function ? never :
  T[K] extends Object[] ? never :
  string[]
};

/**
 * Type that lists out the non function property names of a specified object.
 *
 * @param object The object whose property names will be fetched.
 */
type NonFunctionPropertyNames<T> = {
  [K in keyof T]: T[K] extends Function ? never : K
}[keyof T];

/**
 * Simple alias for the NonFunctionPropertyNames<T> type. Refer to that for more info.
 *
 * @param object The object whose property names will be fetched.
 */
type EntityNames<T> = NonFunctionPropertyNames<T>;


// TODO: this could potentially be a type
// type DogFormChangeHandler<T> = 

// type KeyedErrors<T> = { [K in keyof T]?: string[] | null | undefined };