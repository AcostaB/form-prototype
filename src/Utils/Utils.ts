import { isEmpty, filter, map, mapValues } from "lodash";

let counter = 0;

export const newUniqueID = () => {
  counter -= 1;
  return counter;
}

// TODO fix these anys
// export const mapEntitiesToErrors = (entities: any): any => {
//   const result = mapValues(entities, entity =>
//     mapValues(entity, id =>
//       mapValues(entity[id], entityField => [])
//     )
//   );

//   return result;
// };

// TODO fix these anys
// export const mapEntitiesToValidators = (entities: any): any => {
//   const result = mapValues(entities, entity =>
//     mapValues(entity, id =>
//       mapValues(entity[id], entityField => [])
//     )
//   );

//   return result;
// };

// TODO fix these anys
export const mapValidatorsToErrors = (validators: any, values: any): any => {
  const result = mapValues(values, (entityObjects, entityName) =>
    mapValues(entityObjects, (entityObject, objectID) =>
      mapValues(entityObject, (fieldValue, field) => {
        if (validators[entityName] && validators[entityName][objectID] && validators[entityName][objectID][field]) {
          return filter(map(validators[entityName][objectID][field], validator =>
            validator(fieldValue)), error => error);
        } else {
          return [];
        }
      })
    )
  );

  return result;
};

// TODO fix these anys
export const addOrEditEntity = (prevEntityCollection: any, entity: any, id: number, field: string, value: any) => {
  // Prevent references to undefined objects.
  const entityCollectionToSpread = !isEmpty(prevEntityCollection[entity]) ? prevEntityCollection[entity] : {};
  const entityObjectToSpread = !isEmpty(entityCollectionToSpread) ? prevEntityCollection[entity][id] : {};

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
}