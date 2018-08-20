import './App.css';
import Form1 from "./Components/Form1";
import Form2 from "./Components/Form2";
import logo from './logo.svg';
import * as React from 'react';
import styled from "styled-components";

interface IState {
  name: string,
  age: number,
  dateOfBirth: string,
  gender: string,
  dogName: string,
  breed: string,
  dogAge: number,
  size: string
}

class App extends React.Component<{}, IState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      age: 0,
      breed: '',
      dateOfBirth: '',
      dogAge: 0,
      dogName: '',
      gender: '',
      name: '',
      size: ''
    };
  }

  // TODO: this name property can be casted as a value in the state.
  public handleFieldChange = (name: string) => {
    // const self = this;
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const newValue: string = e.target.value;
      this.setState(prevState => ({ ...prevState, [name]: newValue }));
    };
  };

  public render() {
    return (
      <div>
        <Header>
          <Logo src={logo} alt="logo" />
          <Title className="App-title">Welcome to React</Title>
        </Header>
        <Form1
          age={this.state.age}
          dateOfBirth={this.state.dateOfBirth}
          gender={this.state.gender}
          name={this.state.name}
          onFieldChange={this.handleFieldChange}
        />
        <Form2
          age={this.state.dogAge}
          breed={this.state.breed}
          name={this.state.dogName}
          onFieldChange={this.handleFieldChange}
          size={this.state.size}
        />
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