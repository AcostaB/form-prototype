import { isEmpty, filter, map, mapValues } from "lodash";
import { ChangeHandlerBuilder } from "../Definitions/main";

let counter = 0;

export const newUniqueID = () => {
  counter -= 1;
  return counter;
};

// TODO fix these anys
export const mapValidatorsToErrors = (validators: any, values: any): any => {
  const result = mapValues(values, (entityObjects, entityName) =>
    mapValues(entityObjects, (entityObject, objectID) =>
      mapValues(entityObject, (fieldValue, field) => {
        if (
          validators[entityName] &&
          validators[entityName][objectID] &&
          validators[entityName][objectID][field]
        ) {
          return filter(
            map(validators[entityName][objectID][field], validator =>
              validator(fieldValue)
            ),
            error => error
          );
        } else {
          return [];
        }
      })
    )
  );

  return result;
};

// type AddOrEditEntityField = <
//   C extends INormalizedEntities,
//   E extends Required<keyof C>,
//   I extends Required<keyof C[E]>,
//   F extends Required<keyof C[E][I]>,
//   V extends Required<C[E][I][F]>
//   >(
//   prevEntityCollection: C,
//   entity: E,
//   id: I,
//   field: F,
//   value: V
// ) => C;

// TODO fix these anys
export const addOrEditEntityField: any = (
  // export const addOrEditEntityField: AddOrEditEntityField = (
  prevEntityCollection: any,
  entity: any,
  id: any,
  field: any,
  value: any
) => {
  // Prevent references to undefined objects.
  const entityCollectionToSpread = !isEmpty(prevEntityCollection[entity])
    ? prevEntityCollection[entity]
    : {};
  const entityObjectToSpread = !isEmpty(entityCollectionToSpread)
    ? prevEntityCollection[entity][id]
    : {};

  const newEntityCollection = {
    ...prevEntityCollection,
    [entity]: {
      ...entityCollectionToSpread,
      [id]: {
        ...entityObjectToSpread,
        [field]: value
      }
    }
  };

  return newEntityCollection;
};

// TODO: Issues:
//    1. field needs better typing.
//    2. when doing validation change, i can modify more than one field at a time.
//  X 3. Need to specify the id of the field.
//    4. I'm passing in errors, but it might be a new value or an array of errors.
//    5. New value is of type any.
export const changeHandlerBuilder: ChangeHandlerBuilder = context => category => entity => id => field => value => prevState => {
  // TODO: need to deal with the calculated types in here.
  const prevStateAsRequired = prevState as Required<typeof prevState>;

  const safeContexts = (prevState.contexts !== undefined
    ? prevStateAsRequired.contexts
    : {}) as any;
  // : {}) as Required<typeof prevStateAsRequired.contexts>;

  const safeContext: any =
    safeContexts[context] !== undefined ? safeContexts[context] : {};

  const safeCategory: any =
    safeContext[category] !== undefined ? safeContext[category] : {};

  const safeEntity: any =
    safeCategory[entity] !== undefined ? safeCategory[entity] : {};

  const safeID: any = safeEntity[id] !== undefined ? safeEntity[id] : {};

  return {
    ...prevState,
    contexts: {
      ...prevState.contexts,
      [context]: {
        ...safeContext,
        [category]: {
          ...safeCategory,
          [entity]: {
            ...safeEntity,
            [id]: {
              ...safeID,
              [field]: value
            }
          }
        }
      }
    }
  };
};

// const test = changeHandlerBuilder("DemoForm")("entities")("buildings")(789);