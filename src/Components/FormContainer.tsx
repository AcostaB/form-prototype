import React, { FunctionComponent, useState } from 'react';
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

export const FormContainer: FunctionComponent<{}> = () => {
  const [state, setState] = useState<MainState>({
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

  const clearFormHandler = () => {
    const emptyBuilding: Normalized<Building> = new BuildingNormalized();
    const emptyBuildingErrors: Errors<Building> = {
      construction: undefined,
      name: undefined,
      website: undefined
    };

    // TODO - RESEARCH - IS THE NEW SET STATE ASYNC?
    setState(
      {
        ...state,
        contexts: {
          DemoForm: {
            entities: {
              buildings: keyBy([emptyBuilding], "buildingID")
            },
            errors: {
              buildings: {
                [emptyBuilding.buildingID]: emptyBuildingErrors
              }
            }
          }
        }
      }
    );
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