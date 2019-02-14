import React, { FunctionComponent, useReducer, Reducer } from 'react';
import { LocationForm } from "./LocationForm";
import styled from "styled-components";
import { normalize } from "normalizr";
import { building as BuildingSchema, location as LocationSchema } from "../Schemas/Demo";
import { data as buildingData } from "../Data/Buildings";
import { data as locationData } from "../Data/Location";
import { mapValues, keyBy } from "lodash";
import { BuildingNormalized, Building } from "../Models/Building";
import { changeHandlerBuilder } from "../Utils/Utils";
import { MainState, Normalized, Errors } from "../Definitions/main";
import { DemoFormErrors, DemoFormEntities } from "../Definitions/DemoForm";
import { LocationFormErrors, LocationFormEntities } from "../Definitions/LocationForm";
import { Location } from '../Models/Location';
import { Address } from '../Models/Address';

const createNewLocation = (): Location => {
  // TODO The fact that all of this is necessary means that I am doing a poor job of handling possible nulls or undefined. Improve this.
  const newLocation = new Location();
  newLocation.address = new Address();
  const newBuilding = new Building();
  newBuilding.address = new Address();
  newLocation.buildings = [newBuilding];
  return newLocation;
}

const LocationReducer: Reducer<LocationFormEntities, any> = (state, action) => {
  switch (action.type) {
    case 'CLEAR_FORM':
      return normalize([action.payload], [LocationSchema]).entities;
    case 'ADD_LOCATION':
      const newLocationNormalized: LocationFormEntities = normalize([action.payload], [LocationSchema]).entities;
      return ({
        addresses: { ...state.addresses, ...newLocationNormalized.addresses },
        buildings: { ...state.buildings, ...newLocationNormalized.buildings },
        locations: { ...state.locations, ...newLocationNormalized.locations }
      });
    default:
      return state;
  }
};

const LocationErrorsReducer: Reducer<LocationFormErrors, any> = (state, action) => {
  switch (action.type) {
    case 'CLEAR_FORM':
      return createLocationErrorsObject(normalize([action.payload], [LocationSchema]).entities);
    case 'ADD_LOCATION':
      const newLocationNormalized: LocationFormEntities = normalize([action.payload], [LocationSchema]).entities;
      const newLocationsNormalized = ({
        addresses: { ...state.addresses, ...newLocationNormalized.addresses },
        buildings: { ...state.buildings, ...newLocationNormalized.buildings },
        locations: { ...state.locations, ...newLocationNormalized.locations }
      });
      return createLocationErrorsObject(newLocationsNormalized);
    default:
      return state;
  }
};

const AppReducer: Reducer<MainState, any> = (state, action) => {
  return ({
    entities: {},
    contexts: {
      DemoForm: {
        entities: fetchBuildings(),
        errors: createErrorsObject(fetchBuildings())
      },
      LocationForm: {
        entities: LocationReducer(state!.contexts!.LocationForm!.entities!, action),
        errors: LocationErrorsReducer(state!.contexts!.LocationForm!.errors!, action)
      }
    }
  })
}

export const FormContainer: FunctionComponent<{}> = () => {
  const [state, dispatch] = useReducer(AppReducer, {
    entities: {},
    contexts: {
      DemoForm: {
        entities: fetchBuildings(),
        errors: createErrorsObject(fetchBuildings())
      },
      LocationForm: {
        entities: fetchLocations(),
        errors: createLocationErrorsObject(fetchLocations())
      }
    }
  });

  const addNewLocationHandler = () => {
    dispatch({ type: "ADD_LOCATION", payload: createNewLocation() });
  }

  const clearFormHandler = () => {
    dispatch({ type: "CLEAR_FORM", payload: createNewLocation() });
  };

  const LocationEntities: LocationFormEntities =
    state.contexts !== undefined
      && state.contexts.LocationForm !== undefined
      && state.contexts.LocationForm.entities !== undefined
      ? state.contexts.LocationForm.entities
      : {};

  const LocationErrors: LocationFormErrors =
    state.contexts !== undefined
      && state.contexts.LocationForm !== undefined
      && state.contexts.LocationForm.errors !== undefined
      ? state.contexts.LocationForm.errors
      : {};

  return (
    <Container>
      {/* <DemoForm
          onFieldChange={changeHandlerBuilder("DemoForm")("entities")}
          onValidationChange={changeHandlerBuilder("DemoForm")("errors")}
          entities={demoEntities}
          errors={demoErrors}
          validateAllHandler={validateAllDemoHandler}
          clearFormHandler={clearFormHandler}
        /> */}
      <LocationForm
        onFieldChange={changeHandlerBuilder("LocationForm")("entities")}
        // onValidationChange={changeHandlerBuilder("LocationForm")("errors")}
        entities={LocationEntities}
        errors={LocationErrors}
        // validateAllHandler={validateAllLocationHandler}
        addLocationHandler={addNewLocationHandler}
        clearFormHandler={clearFormHandler}
      />
    </Container>
  );
}

const fetchBuildings = (): DemoFormEntities => {
  const result = normalize(buildingData, [BuildingSchema]);
  return result.entities as DemoFormEntities;
};

const createErrorsObject = (entities: DemoFormEntities): DemoFormErrors => {
  return mapValues(entities, entity =>
    mapValues(entity, id => mapValues(id, () => []))
  ) as DemoFormErrors;
};

const fetchLocations = (): LocationFormEntities => {
  const result = normalize(locationData, [LocationSchema]);
  return result.entities as LocationFormEntities;
};

const createLocationErrorsObject = (entities: LocationFormEntities): LocationFormErrors => {
  return mapValues(entities, entity =>
    mapValues(entity, id => mapValues(id, property => []))
  ) as LocationFormErrors;
};

const Container = styled.div`
  margin: 20px;
`;