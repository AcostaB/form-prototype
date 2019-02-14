export type NormalizeOne<T> = T extends number
  ? number
  : T extends string
  ? string
  : T extends number[]
  ? number[]
  : T extends string[]
  ? string[]
  : T extends Function
  ? never
  : T extends Array<Object> ? number[] : T extends Object ? number : T; // not reached due to compiler issue

/**
 * Will convert the object to a normalized object similar to a table in a relational database.
 * Collection types like objects or arrays of objects will be mapped to 
 * a number or array of numbers, respectively. 
 */
export type Normalized<T> = { [K in keyof T]: NormalizeOne<T[K]> };

// Alternate solution from the same stack overflow answer:
// export type NormalizeOne<T> =
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
 * Indicates that a collection of objects have been keyed using a specified property, usually the ID.
 * A good example would be the keyBy method in the lodash api.
 */
export type Keyed<T> = { [id: number]: T | undefined };

export type Validator = (...param: any[]) => string | null | undefined;

// TODO improve on this. this should only constitute of primitive values (no objects or arrays), no functions
export type Errors<T> = { [K in keyof T]?: string[] };
// TODO: this could potentially be a type
// export type DogFormChangeHandler<T> =

export interface NormalizedEntities {
  [entityNames: string]: Keyed<Normalized<any>> | undefined;
}

export interface NormalizedErrors {
  [entityNames: string]: Keyed<Errors<any>> | undefined;
}

export interface Context {
  [contextName: string]: {
    entities?: NormalizedEntities;
    errors?: NormalizedErrors;
  };
}

export interface AppState {
  entities?: NormalizedEntities;
  contexts?: {
    [contextNames: string]:
    | {
      entities?: NormalizedEntities;
      errors?: NormalizedErrors;
      entities2?: NormalizedEntities;
      errors2?: NormalizedErrors;
    }
    | undefined;
  };
}

// TODO better handle these optional parameters. Should they be optional?
// TODO Better export type the contexts parameter
export interface MainState extends AppState {
  entities?: {};
  contexts?: {
    DemoForm?: {
      entities?: DemoFormEntities;
      errors?: DemoFormErrors;
    };
    SOVForm?: {
      entities?: SOVFormEntities;
      errors?: SOVFormErrors;
    }
  };
}

// export type Safe<T> = { [K in keyof T]: T[K] extends undefined ? never : T[K] };
// export type Safe2<T> = { [K in keyof T]: Exclude<T[K], undefined> };
// export type Safe3<T> = { [K in keyof T]: number[] };
// export type Safe4<T> = Exclude<T, undefined>;

// export type Required<T> = Exclude<T, undefined>;

export type test1 = keyof Required<MainState>;
export type test2 = keyof IMainState["contexts"];
export type test3 = Required<keyof MainState["contexts"]>;
export type test4 = keyof Required<MainState["contexts"]>;
export type test5 = keyof Required<Required<MainState["contexts"]>[test4]>;
export type test6 = Required<Required<MainState>["contexts"]>;
// export type test7 = Required<Required<IMainState["contexts"]>[test6]>;

// export type test33 = Safe<{
//   propertyName?: string;
// }>;
// export type test332 = Required<{
//   propertyName?: string;
//   otherProperty?: {
//     nested?: {
//       nestedAgain?: string;
//     };
//   };
// }>;
// export type test333 = Safe3<{
//   propertyName?: string;
// }>;
// export type test334 = Safe4<{
//   propertyName?: string;
// }>;
/**
 * Generic function that builds change handlers through currying.
 * C = Context, CA = Category, E = Entity, I = ID, F = Field, V = Value
 **/
export type ChangeHandlerBuilder = <
  C extends keyof Required<Required<IMainState>["contexts"]>,
  CA extends keyof Required<Required<Required<IMainState>["contexts"]>[C]>,
  E extends keyof Required<
    Required<Required<Required<IMainState>["contexts"]>[C]>[CA]
  >,
  I extends keyof Required<
    Required<Required<Required<Required<IMainState>["contexts"]>[C]>[CA]>[E]
  >,
  F extends keyof Required<
    Required<
      Required<Required<Required<Required<IMainState>["contexts"]>[C]>[CA]>[E]
    >[I]
  >,
  V extends keyof Required<
    Required<
      Required<
        Required<Required<Required<Required<IMainState>["contexts"]>[C]>[CA]>[E]
      >[I]
    >[F]
  >
  >(
  context: C
) => (
    category: CA
  ) => (
      entity: E
    ) => (
        id: I
      ) => (field: F) => (value: V) => (prevState: MainState) => MainState;
