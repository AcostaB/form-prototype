import './App.css';
import Form1 from "./Components/Form1";
// import Form2 from "./Components/Form2";
import logo from './logo.svg';
import * as React from 'react';
import styled from "styled-components";

interface IState {
  person: IPerson,
  dog: IDog,
  form1: {
    errors: KeyedErrors<IPerson>
  },
  form2: {
    errors: KeyedErrors<IDog>
  }
}

class App extends React.Component<{}, IState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      dog: {
        age: 0,
        breed: '',
        name: '',
        size: ''
      },
      form1: {
        errors: {}
      },
      form2: {
        errors: {}
      },
      person: {
        age: 0,
        dateOfBirth: '',
        email: '',
        gender: '',
        name: ''
      }
    };
  };

  public handlePersonFieldChange = (name: Key<IPerson>) => {
    return (newValue: any) => {
      this.setState(prevState => (
        {
          ...prevState,
          person: {
            ...prevState.person,
            [name]: newValue
          }
        }
      ));
    };
  };

  public handlePersonValidationChange = (name: Key<IPerson>) => {
    return (newErrors: string[]) => {
      this.setState(prevState => (
        {
          ...prevState,
          form1: {
            ...prevState.form1,
            errors: {
              ...prevState.form1.errors,
              [name]: newErrors
            }
          }
        }
      ));
    };
  };

  // public handleDogFieldChange = (name: Key<IDog>) => {
  //   return (newValue: any, newErrors: string[]) => {
  //     this.setState(prevState => (
  //       {
  //         ...prevState,
  //         dog: {
  //           ...prevState.dog,
  //           [name]: newValue
  //         },
  //         form2: {
  //           ...prevState.form2,
  //           errors: {
  //             ...prevState.form2.errors,
  //             [name]: newErrors
  //           }
  //         },
  //       }
  //     ));
  //   };
  // };

  public render() {
    return (
      <div>
        <Header>
          <Logo src={logo} alt="logo" />
          <Title className="App-title">Welcome to React</Title>
        </Header>
        <Form1
          {...this.state.person}
          onFieldChange={this.handlePersonFieldChange}
          onValidationChange={this.handlePersonValidationChange}
          errors={this.state.form1.errors}
        />
        {/* <Form2
          age={this.state.dog.age}
          breed={this.state.dog.breed}
          name={this.state.dog.name}
          onFieldChange={this.handleDogFieldChange}
          size={this.state.dog.size}
          errors={this.state.form2.errors}
        /> */}
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
      </div>
    );
  }
}

export default App;

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