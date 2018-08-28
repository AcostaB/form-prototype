import { mapValues } from "lodash";

let counter = 0;

export const newUniqueID = () => {
  counter -= 1;
  return counter;
}

// TODO fix these anys
export const mapEntitiesToErrors = (entities: any): any => {
  return (
    mapValues(entities, entity =>
      mapValues(entity, id =>
        mapValues(entity[id], entityField => undefined)
      )
    )
  );
};

// TODO fix these anys
export const mapEntitiesToValidators = (entities: any): any => {
  return (
    mapValues(entities, entity =>
      mapValues(entity, id =>
        mapValues(entity[id], entityField => [])
      )
    )
  );
};

// TODO fix these anys
export const mapValidatorsToErrors = (validators: any, values: any): any => {
  return (
    mapValues(validators, entity =>
      mapValues(entity, id =>
        mapValues(entity[id], entityField =>
          mapValues(entityField, validator => validator(values[entity][id][entityField])))
      )
    )
  );
};