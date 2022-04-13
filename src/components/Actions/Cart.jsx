import React from 'react';
import styled from 'styled-components';
import CartIcon from '../../assets/cart-icon.svg';

const CartButton = styled.button`
  position: relative;
  border: none;
  width: 40px;
  height: 40px;
  background: url(${CartIcon}) center no-repeat;
`;

const CartBadge = styled.div`
  position: absolute;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: black;
  color: white;
  text-align: center;
  line-height: 20px;
  top: 0;
  right: 0;
`;
export class Cart extends React.Component {
  render() {
    return (
      <CartButton>
        <CartBadge>2</CartBadge>
      </CartButton>
    );
  }
}
