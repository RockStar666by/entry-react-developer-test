import React from 'react';
import styled from 'styled-components';
import { AppRouting } from '../../feature/Routing';
import { Header } from '../Header/Header';

const AppContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: 0 auto;
`;
export class App extends React.Component {
  render() {
    return (
      <AppContainer className="App">
        <Header />
        <AppRouting />
      </AppContainer>
    );
  }
}
