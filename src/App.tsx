import './App.css';
import SOVForm, { ISOVFormEntities, ISOVFormErrors } from "./Components/SOVForm";
import logo from './logo.svg';
import * as React from 'react';
import styled from "styled-components";
import { normalize } from "normalizr";
import { building as buildingSchema } from "./Schemas/Buildings";
import { buildingData } from "./Data/Buildings";
import { mapValues } from "lodash";

// TODO better handle these optional parameters. Should they be optional?
// TODO Better type the contexts parameter
interface IState {
  entities: {}
  contexts: {
    sovForm: {
      entities: ISOVFormEntities
    },
    sovFormErrors: {
      entities: ISOVFormErrors
    }
  }
}

class App extends React.Component<{}, IState> {

  constructor(props: {}) {
    super(props);

    this.state = {
      entities: {},
      contexts: {
        sovForm: { entities: fetchBuildings() },
        sovFormErrors: { entities: createErrorsObject(fetchBuildings()) }
      }
    };
  };

  // TODO: Issues: 
  //    1. field needs better typing. 
  //    2. when doing validation change, i can modify more than one field at a time. 
  //  X 3. Need to specify the id of the field.
  //    4. I'm passing in errors, but it might be a new value or an array of errors.
  //    5. New value is of type any. 
  public handleChange = (context: ("sovForm" | "sovFormErrors" | null)) => {
    // If no context, then changes are to root level entities.
    if (context === null) {
      // TODO: need to better type this. Can scope to entities at the root level.
      return (entity: ("apartments" | "buildings" | "people")) => {
        return (field: string, id: number) => {
          // TODO: use generics to better identify the type of the new value.
          return (newValue: any) =>
            this.setState(prevState => {
              return {
                ...prevState,
                entities: {
                  ...prevState.entities,
                  [entity]: {
                    ...prevState.entities[entity],
                    [id]: {
                      ...prevState.entities[entity][id],
                      [field]: newValue
                    }
                  }
                }
              }
            });
        };
      };
    }

    // If context is provided, then entities are scoped 
    // TODO: need to better type this. Can scope to entities at the context level.
    return (entity: ("apartments" | "buildings" | "people")) => {
      return (field: string, id: number) => {
        // TODO: use generics to better identify the type of the new value.
        return (newValue: any) =>
          this.setState(prevState => {
            return {
              ...prevState,
              contexts: {
                ...prevState.contexts,
                [context]: {
                  ...prevState.contexts[context],
                  entities: {
                    ...prevState.contexts[context].entities,
                    [entity]: {
                      ...prevState.contexts[context].entities[entity],
                      [id]: {
                        ...prevState.contexts[context].entities[entity][id],
                        [field]: newValue
                      }
                    }
                  }
                }
              }
            }
          }
          );
      };
    };
  };

  public render() {
    return (
      <div>
        <Header>
          <Logo src={logo} alt="logo" />
          <Title className="App-title">Welcome to React</Title>
        </Header>
        <SOVForm
          onFieldChange={this.handleChange("sovForm")}
          onValidationChange={this.handleChange("sovFormErrors")}
          onSingleValidationChange={this.handleChange("sovFormErrors")}
          entities={this.state.contexts.sovForm.entities}
          errors={this.state.contexts.sovFormErrors.entities}
        />
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
      </div>
    );
  }
}

export default App;

const fetchBuildings = (): ISOVFormEntities => {
  const result = normalize(buildingData, [buildingSchema])
  console.dir(result);
  return result.entities as ISOVFormEntities;
}

const createErrorsObject = (entities: ISOVFormEntities): ISOVFormErrors => {
  return mapValues(entities, entity => mapValues(entity, id => mapValues(id, property => null))) as ISOVFormErrors;
}

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