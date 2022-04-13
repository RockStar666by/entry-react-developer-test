import React from 'react';
import styled from 'styled-components';

const CartPageContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  background: pink;
`;

export class CartPage extends React.Component {
  render() {
    return (
      <CartPageContainer>
        <h1>Cart Page</h1>
      </CartPageContainer>
    );
  }
}
