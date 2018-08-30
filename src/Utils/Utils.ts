import { mapValues } from "lodash";

let counter = 0;

export const newUniqueID = () => {
  counter -= 1;
  return counter;
}

// TODO fix these anys
export const mapEntitiesToErrors = (entities: any): any => {
  const result = mapValues(entities, entity =>
    mapValues(entity, id =>
      mapValues(entity[id], entityField => [])
    )
  );

  return result;
};

// TODO fix these anys
export const mapEntitiesToValidators = (entities: any): any => {
  const result = mapValues(entities, entity =>
    mapValues(entity, id =>
      mapValues(entity[id], entityField => [])
    )
  );

  return result;
};

// TODO fix these anys
export const mapValidatorsToErrors = (validators: any, values: any): any => {
  const result = mapValues(validators, entity =>
    mapValues(entity, id =>
      mapValues(entity[id], entityField =>
        mapValues(entityField, validator => validator(values[entity][id][entityField])))
    )
  );

  return result;
};