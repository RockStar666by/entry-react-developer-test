import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import * as Styles from './styles';

const theme = { primary: '#5ece7b' };

export class Counter extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { counter: 1 };
    this.onMinusClick = this.onMinusClick.bind(this);
    this.onPlusClick = this.onPlusClick.bind(this);
  }

  componentDidMount() {
    this.props.addParentState(this.state.counter);
  }

  componentDidUpdate() {
    this.props.addParentState(this.state.counter);
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
        <Styles.CounterContainer>
          <Styles.CounterHeader>QUANTITY:</Styles.CounterHeader>
          <Styles.CounterField>
            <Styles.ChangeCountButton onClick={this.onMinusClick}>－</Styles.ChangeCountButton>
            <Styles.Quantity>{this.state.counter}</Styles.Quantity>
            <Styles.ChangeCountButton onClick={this.onPlusClick}>＋</Styles.ChangeCountButton>
          </Styles.CounterField>
        </Styles.CounterContainer>
      </ThemeProvider>
    );
  }
}

Counter.propTypes = { addParentState: PropTypes.func.isRequired };
