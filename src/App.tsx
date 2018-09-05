import "./App.css";
import logo from "./logo.svg";
import * as React from "react";
// import DemoForm from "./Components/DemoForm";
import { SOVForm } from "./Components/SOVForm";
import styled from "styled-components";
import { normalize } from "normalizr";
import { building as demoBuildingSchema } from "./Schemas/Demo";
import { data as buildingData } from "./Data/DemoBuildings";
import { location as locationSchema } from "./Schemas/SOV";
import { data as locationData } from "./Data/SOV";
import { mapValues, keyBy } from "lodash";
import { DemoBuildingNormalized } from "./Models/DemoBuilding";
import { changeHandlerBuilder } from "./Utils/Utils";

class App extends React.Component<{}, IMainState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      entities: {},
      contexts: {
        DemoForm: {
          entities: fetchBuildings(),
          errors: createErrorsObject(fetchBuildings())
        },
        SOVForm: {
          entities: fetchLocations(),
          errors: createSOVErrorsObject(fetchLocations())
        }
      }
    };
  }

  public validateAllDemoHandler = (newErrorsByEntity: IDemoFormErrors) => {
    this.setState(
      (prevState: IMainState): IMainState => ({
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

  public validateAllSOVHandler = (newErrorsByEntity: ISOVFormErrors) => {
    this.setState(
      (prevState: IMainState): IMainState => ({
        ...prevState,
        contexts: {
          ...prevState.contexts,
          SOVForm: {
            ...prevState.contexts!.SOVForm,
            errors: newErrorsByEntity
          }
        }
      })
    );
  };

  public clearFormHandler = () => {
    const emptyBuilding: Normalized<IDemoBuilding> = new DemoBuildingNormalized();
    const emptyBuildingErrors: Errors<IDemoBuilding> = {
      construction: undefined,
      name: undefined,
      website: undefined
    };

    this.setState(
      (prevState: IMainState): IMainState => ({
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

    const sovEntities: ISOVFormEntities =
      this.state.contexts !== undefined
        && this.state.contexts.SOVForm !== undefined
        && this.state.contexts.SOVForm.entities !== undefined
        ? this.state.contexts.SOVForm.entities
        : {};

    const sovErrors: ISOVFormErrors =
      this.state.contexts !== undefined
        && this.state.contexts.SOVForm !== undefined
        && this.state.contexts.SOVForm.errors !== undefined
        ? this.state.contexts.SOVForm.errors
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
          <SOVForm
            onFieldChange={changeHandlerBuilder("SOVForm")("entities")}
            onValidationChange={changeHandlerBuilder("SOVForm")("errors")}
            entities={sovEntities}
            errors={sovErrors}
            validateAllHandler={this.validateAllSOVHandler}
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

const fetchBuildings = (): IDemoFormEntities => {
  const result = normalize(buildingData, [demoBuildingSchema]);
  return result.entities as IDemoFormEntities;
};

const createErrorsObject = (entities: IDemoFormEntities): IDemoFormErrors => {
  return mapValues(entities, entity =>
    mapValues(entity, id => mapValues(id, property => []))
  ) as IDemoFormErrors;
};

const fetchLocations = (): ISOVFormEntities => {
  const result = normalize(locationData, [locationSchema]);
  return result.entities as ISOVFormEntities;
};

const createSOVErrorsObject = (entities: ISOVFormEntities): ISOVFormErrors => {
  return mapValues(entities, entity =>
    mapValues(entity, id => mapValues(id, property => []))
  ) as ISOVFormErrors;
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