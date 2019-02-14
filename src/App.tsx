import "./App.css";
import logo from "./logo.svg";
import * as React from "react";
// import DemoForm from "./Components/DemoForm";
import { LocationForm } from "./Components/LocationForm";
import styled from "styled-components";
import { normalize } from "normalizr";
import { building as BuildingSchema, location as LocationSchema } from "./Schemas/Demo";
import { data as buildingData } from "./Data/Buildings";
import { data as locationData } from "./Data/Location";
import { mapValues, keyBy } from "lodash";
import { BuildingNormalized, Building } from "./Models/Building";
import { changeHandlerBuilder } from "./Utils/Utils";
import { MainState, Normalized, Errors } from "./Definitions/main";
import { DemoFormErrors, DemoFormEntities } from "./Definitions/DemoForm";
import { LocationFormErrors, LocationFormEntities } from "./Definitions/LocationForm";

class App extends React.Component<{}, MainState> {
  constructor(props: {}) {
    super(props);

    this.state = {
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
    };
  }

  public validateAllDemoHandler = (newErrorsByEntity: DemoFormErrors) => {
    this.setState(
      (prevState: MainState): MainState => ({
        ...prevState,
        contexts: {
          ...prevState.contexts,
          DemoForm: {
            ...prevState.contexts!.DemoForm,
            errors: newErrorsByEntity
          }
        }
      })
    );
  };

  public validateAllLocationHandler = (newErrorsByEntity: LocationFormErrors) => {
    this.setState(
      (prevState: MainState): MainState => ({
        ...prevState,
        contexts: {
          ...prevState.contexts,
          LocationForm: {
            ...prevState.contexts!.LocationForm,
            errors: newErrorsByEntity
          }
        }
      })
    );
  };

  public clearFormHandler = () => {
    const emptyBuilding: Normalized<Building> = new BuildingNormalized();
    const emptyBuildingErrors: Errors<Building> = {
      construction: undefined,
      name: undefined,
      website: undefined
    };

    this.setState(
      (prevState: MainState): MainState => ({
        ...prevState,
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
      })
    );
  };

  public render() {
    // const demoEntities: IDemoFormEntities =
    //   this.state.contexts !== undefined
    //     && this.state.contexts.DemoForm !== undefined
    //     && this.state.contexts.DemoForm.entities !== undefined
    //     ? this.state.contexts.DemoForm.entities
    //     : {};

    // const demoErrors: IDemoFormErrors =
    //   this.state.contexts !== undefined
    //     && this.state.contexts.DemoForm !== undefined
    //     && this.state.contexts.DemoForm.errors !== undefined
    //     ? this.state.contexts.DemoForm.errors
    //     : {};

    const LocationEntities: LocationFormEntities =
      this.state.contexts !== undefined
        && this.state.contexts.LocationForm !== undefined
        && this.state.contexts.LocationForm.entities !== undefined
        ? this.state.contexts.LocationForm.entities
        : {};

    const LocationErrors: LocationFormErrors =
      this.state.contexts !== undefined
        && this.state.contexts.LocationForm !== undefined
        && this.state.contexts.LocationForm.errors !== undefined
        ? this.state.contexts.LocationForm.errors
        : {};

    return (
      <div>
        <Header>
          <Logo src={logo} alt="logo" />
          <Title className="App-title">ARL - Data Capture Prototype</Title>
        </Header>
        <Container>

          {/* <DemoForm
          onFieldChange={changeHandlerBuilder("DemoForm")("entities")}
          onValidationChange={changeHandlerBuilder("DemoForm")("errors")}
          entities={demoEntities}
          errors={demoErrors}
          validateAllHandler={this.validateAllDemoHandler}
          clearFormHandler={this.clearFormHandler}
        /> */}
          <LocationForm
            onFieldChange={changeHandlerBuilder("LocationForm")("entities")}
            onValidationChange={changeHandlerBuilder("LocationForm")("errors")}
            entities={LocationEntities}
            errors={LocationErrors}
            validateAllHandler={this.validateAllLocationHandler}
            clearFormHandler={this.clearFormHandler}
          />
        </Container>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
      </div>
    );
  }
}

export default App;

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

const Logo = styled.img`
  animation: App-logo-spin infinite 20s linear;
  height: 80px;
`;

const Header = styled.div`
  background-color: #222;
  height: 150px;
  padding: 20px;
  color: white;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 20px;
`;

const Container = styled.div`
  margin: 20px;
`;