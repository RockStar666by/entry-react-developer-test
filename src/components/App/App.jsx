import React from 'react';
import styled from 'styled-components';
import { Header } from '../Header/Header';

const AppContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 100vh;
  margin: 0 auto;
  background: grey;
`;
export class App extends React.Component {
  render() {
    return (
      <AppContainer className='App'>
        <Header />
        <span>hello world</span>
      </AppContainer>
    );
  }
}
