interface IPerson {
  age: number,
  dateOfBirth: string,
  email: string,
  gender: string,
  name: string
}

interface IDog {
  age: number,
  breed: string,
  name: string,
  size: string
}

// TODO: improve on this so its non function properties only
type Key<T> = keyof T;

type Keyed<T> = { [id: number]: T };

type KeyedErrors<T> = { [K in keyof T]?: string[] | null | undefined };

type Validator = (...param: any[]) => string | null | undefined;

// TODO: this could potentially be a type
// type DogFormChangeHandler<T> = 