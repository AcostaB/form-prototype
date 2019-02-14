import "./App.css";
import * as React from "react";
import { FormContainer } from './Components/FormContainer';
import styled from 'styled-components/macro';
import logo from "./logo.svg";

class App extends React.Component<{}, {}> {
  public render = () =>
    <div>
      <Header>
        <Logo src={logo} alt="logo" />
        <Title className="App-title">ARL - Data Capture Prototype</Title>
      </Header>
      <FormContainer />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      />
    </div>
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
  font-size: 20px;
`;