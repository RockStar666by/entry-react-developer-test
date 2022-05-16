import styled from 'styled-components';

export const CartPageContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1440px;
  box-sizing: border-box;
  padding: 80px 100px 0;
  margin-bottom: 275px;
`;

export const CartHeader = styled.h1`
  margin: 0;
  margin-bottom: 55px;
  font-weight: 700;
  font-size: 32px;
  line-height: 40px;
  text-transform: uppercase;
  color: #1d1f22;
`;

export const CartItemsContainer = styled.div``;
export const CheckoutContainer = styled.div``;
export const CheckoutGrid = styled.div``;
export const GridRow = styled.p`
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-gap: 10px;
  grid-template-areas: 'attributeName attributeValue';
  font-size: 24px;
  line-height: 28px;
`;
export const GridName = styled.span`
  font-weight: 400;
`;
export const GridValue = styled.span`
  font-weight: 700;
`;
