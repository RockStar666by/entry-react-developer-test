import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled, { ThemeProvider, css } from 'styled-components';
import { increaseCount, decreaseCount } from '../../redux/actions';

const theme = { primary: '#5ece7b' };

const CounterContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: ${(props) => (props.mini ? '24px' : '45px')};
  height: 100%;
`;

const SmallQuantity = css`
  width: 24px;
  height: 16px;
  line-height: 16px;
  font-size: 16px;
`;

const BigQuantity = css`
  width: 45px;
  height: 24px;
  line-height: 24px;
  font-size: 24px;
`;

const Quantity = styled.div`
  ${(props) => (props.mini ? `${SmallQuantity}` : `${BigQuantity}`)};
  font-weight: 500;
  text-align: center;
`;

const BigButton = css`
  width: 45px;
  height: 45px;
  line-height: 38px;
  font-size: 38px;
`;

const SmallButton = css`
  width: 24px;
  height: 24px;
  line-height: 20px;
  font-size: 28px;
  text-align: left;
  &::first-letter {
    margin-left: -3px;
  }
`;

const ChangeCountButton = styled.button`
  padding: 0;
  background: none;
  cursor: pointer;
  font-weight: 100;
  text-align: center;
  box-sizing: border-box;
  border: 1px solid black;
  ${(props) => (props.mini ? `${SmallButton}` : `${BigButton}`)}
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

export class CartCounterTemplate extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { counter: this.props.quantity };
    this.onMinusClick = this.onMinusClick.bind(this);
    this.onPlusClick = this.onPlusClick.bind(this);
  }

  componentDidMount() {}

  onMinusClick() {
    if (this.state.counter > 1) {
      this.setState((prevState) => ({ counter: prevState.counter - 1 }));
      this.props.decreaseCount(this.props.productId);
    }
  }

  onPlusClick() {
    if (this.state.counter < 999) {
      this.setState((prevState) => ({ counter: prevState.counter + 1 }));
      this.props.increaseCount(this.props.productId);
    }
  }

  render() {
    const { mini, productId } = this.props;
    console.log(productId);
    return (
      <ThemeProvider theme={theme}>
        <CounterContainer mini={mini}>
          <ChangeCountButton mini={mini} onClick={this.onPlusClick}>
            ＋
          </ChangeCountButton>
          <Quantity mini={mini}>{this.state.counter}</Quantity>
          <ChangeCountButton mini={mini} onClick={this.onMinusClick}>
            －
          </ChangeCountButton>
        </CounterContainer>
      </ThemeProvider>
    );
  }
}

const actionCreators = { increaseCount, decreaseCount };

export const CartCounter = connect(null, actionCreators)(CartCounterTemplate);

CartCounterTemplate.propTypes = {
  mini: PropTypes.bool,
  quantity: PropTypes.number.isRequired,
  productId: PropTypes.string.isRequired,
  increaseCount: PropTypes.func.isRequired,
  decreaseCount: PropTypes.func.isRequired
};
CartCounterTemplate.defaultProps = { mini: false };
