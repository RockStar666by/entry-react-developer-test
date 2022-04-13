import React from 'react';
import styled from 'styled-components';

const ProductPageContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  background: pink;
`;

export class ProductPage extends React.Component {
  render() {
    return (
      <ProductPageContainer>
        <p>23152346</p>
        <h1>Product Page</h1>
      </ProductPageContainer>
    );
  }
}
