type NormalizeOne<T> = T extends number
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
type Normalized<T> = { [K in keyof T]: NormalizeOne<T[K]> };

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
 * Indicates that a collection of objects have been keyed using a specified property, usually the ID.
 * A good example would be the keyBy method in the lodash api.
 */
type Keyed<T> = { [id: number]: T | undefined };

type Validator = (...param: any[]) => string | null | undefined;

// TODO improve on this. this should only constitute of primitive values (no objects or arrays), no functions
type Errors<T> = { [K in keyof T]?: string[] };
// TODO: this could potentially be a type
// type DogFormChangeHandler<T> =

interface INormalizedEntities {
  [entityNames: string]: Keyed<Normalized<any>> | undefined;
}

interface INormalizedErrors {
  [entityNames: string]: Keyed<Errors<any>> | undefined;
}

interface IContext {
  [contextName: string]: {
    entities?: INormalizedEntities;
    errors?: INormalizedErrors;
  };
}

interface IAppState {
  entities?: INormalizedEntities;
  contexts?: {
    [contextNames: string]:
    | {
      entities?: INormalizedEntities;
      errors?: INormalizedErrors;
      entities2?: INormalizedEntities;
      errors2?: INormalizedErrors;
    }
    | undefined;
  };
}

// TODO better handle these optional parameters. Should they be optional?
// TODO Better type the contexts parameter
interface IMainState extends IAppState {
  entities?: {};
  contexts?: {
    DemoForm?: {
      entities?: IDemoFormEntities;
      errors?: IDemoFormErrors;
    };
    SOVForm?: {
      entities?: ISOVFormEntities;
      errors?: ISOVFormErrors;
    }
  };
}

// type Safe<T> = { [K in keyof T]: T[K] extends undefined ? never : T[K] };
// type Safe2<T> = { [K in keyof T]: Exclude<T[K], undefined> };
// type Safe3<T> = { [K in keyof T]: number[] };
// type Safe4<T> = Exclude<T, undefined>;

// type Required<T> = Exclude<T, undefined>;

type test1 = keyof Required<IMainState>;
type test2 = keyof IMainState["contexts"];
type test3 = Required<keyof IMainState["contexts"]>;
type test4 = keyof Required<IMainState["contexts"]>;
type test5 = keyof Required<Required<IMainState["contexts"]>[test4]>;
type test6 = Required<Required<IMainState>["contexts"]>;
// type test7 = Required<Required<IMainState["contexts"]>[test6]>;

// type test33 = Safe<{
//   propertyName?: string;
// }>;
// type test332 = Required<{
//   propertyName?: string;
//   otherProperty?: {
//     nested?: {
//       nestedAgain?: string;
//     };
//   };
// }>;
// type test333 = Safe3<{
//   propertyName?: string;
// }>;
// type test334 = Safe4<{
//   propertyName?: string;
// }>;
/**
 * Generic function that builds change handlers through currying.
 * C = Context, CA = Category, E = Entity, I = ID, F = Field, V = Value
 **/
type ChangeHandlerBuilder = <
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
      ) => (field: F) => (value: V) => (prevState: IMainState) => IMainState;
