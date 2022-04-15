import React from 'react';
import styled, { ThemeProvider } from 'styled-components';

const theme = { primary: '#5ece7b' };

const CounterContainer = styled.div`
  margin-bottom: 16px;
`;

const CounterHeader = styled.p`
  height: 18px;
  font-weight: 700;
  font-size: 18px;
  line-height: 18px;
`;

const CounterField = styled.div`
  margin-top: 8px;
  display: flex;
  flex-direction: row;
`;

const Quantity = styled.div`
  width: 60px;
  height: 24px;
  line-height: 24px;
  font-size: 18px;
  text-align: center;
`;

const ChangeCountButton = styled.button`
  padding: 0;
  background: none;
  cursor: pointer;
  width: 24px;
  height: 24px;
  line-height: 22px;
  font-size: 24px;
  font-weight: 400;
  text-align: center;
  box-sizing: border-box;
  border: 1px solid black;
  &:hover {
    color: white;
    background: ${(props) => props.theme.primary};
    border-color: ${(props) => props.theme.primary};
  }
  &:active {
    background: black;
    border-color: black;
  }
`;

export class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { counter: 1 };
    this.onMinusClick = this.onMinusClick.bind(this);
    this.onPlusClick = this.onPlusClick.bind(this);
  }

  onMinusClick() {
    if (this.state.counter > 1) this.setState((prevState) => ({ counter: prevState.counter - 1 }));
  }

  onPlusClick() {
    if (this.state.counter < 999) this.setState((prevState) => ({ counter: prevState.counter + 1 }));
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <CounterContainer>
          <CounterHeader>QUANTITY:</CounterHeader>
          <CounterField>
            <ChangeCountButton onClick={this.onMinusClick}>－</ChangeCountButton>
            <Quantity>{this.state.counter}</Quantity>
            <ChangeCountButton onClick={this.onPlusClick}>＋</ChangeCountButton>
          </CounterField>
        </CounterContainer>
      </ThemeProvider>
    );
  }
}
