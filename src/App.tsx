import "./App.css";
import logo from "./logo.svg";
import * as React from "react";
import SOVForm from "./Components/SOVForm";
import styled from "styled-components";
import { normalize } from "normalizr";
import { building as buildingSchema } from "./Schemas/Buildings";
import { buildingData } from "./Data/Buildings";
import { mapValues, keyBy } from "lodash";
import { BuildingNormalized } from "./Models/Building";
import { changeHandlerBuilder } from "./Utils/Utils";

class App extends React.Component<{}, IMainState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      entities: {},
      contexts: {
        sovForm: {
          entities: fetchBuildings(),
          errors: createErrorsObject(fetchBuildings())
        }
      }
    };
  }

  public validateAllHandler = (newErrorsByEntity: ISOVFormErrors) => {
    this.setState(
      (prevState: IMainState): IMainState => ({
        ...prevState,
        contexts: {
          ...prevState.contexts,
          sovForm: {
            ...prevState.contexts!.sovForm,
            errors: newErrorsByEntity
          }
        }
      })
    );
  };

  public clearFormHandler = () => {
    const emptyBuilding: Normalized<IBuilding> = new BuildingNormalized();
    const emptyBuildingErrors: Errors<IBuilding> = {
      construction: undefined,
      name: undefined,
      website: undefined
    };

    this.setState(
      (prevState: IMainState): IMainState => ({
        ...prevState,
        contexts: {
          sovForm: {
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
    const entities: ISOVFormEntities =
      this.state.contexts !== undefined
        && this.state.contexts.sovForm !== undefined
        && this.state.contexts.sovForm.entities !== undefined
        ? this.state.contexts.sovForm.entities
        : {};

    const errors: ISOVFormErrors =
      this.state.contexts !== undefined
        && this.state.contexts.sovForm !== undefined
        && this.state.contexts.sovForm.errors !== undefined
        ? this.state.contexts.sovForm.errors
        : {};

    return (
      <div>
        <Header>
          <Logo src={logo} alt="logo" />
          <Title className="App-title">Welcome to React</Title>
        </Header>
        <SOVForm
          onFieldChange={changeHandlerBuilder("sovForm")("entities")}
          onValidationChange={changeHandlerBuilder("sovForm")("errors")}
          entities={entities}
          errors={errors}
          validateAllHandler={this.validateAllHandler}
          clearFormHandler={this.clearFormHandler}
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
      </div>
    );
  }
}

export default App;

const fetchBuildings = (): ISOVFormEntities => {
  const result = normalize(buildingData, [buildingSchema]);
  return result.entities as ISOVFormEntities;
};

const createErrorsObject = (entities: ISOVFormEntities): ISOVFormErrors => {
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
  font-size: 1.5em;
`;
