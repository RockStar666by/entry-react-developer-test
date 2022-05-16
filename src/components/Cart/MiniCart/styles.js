import styled from 'styled-components';

export const MiniCartWrapper = styled.div`
  position: relative;
  margin: 0 auto;
  display: flex;
  flex-direction: row-reverse;
  width: 100%;
  max-width: 1440px;
  box-sizing: border-box;
  padding: 0 100px;
`;

export const MiniCartContainer = styled.div`
  position: relative;
  right: -28px;
  width: 325px;
  ${(props) => (props.quantity > 0 ? (props.quantity > 1 ? 'height: 680px;' : 'height: 525px;') : 'height: 200px;')};
  background: white;
  overflow: hidden;
`;

export const CartHeader = styled.p`
  margin: 32px 16px;
  font-size: 16px;
  & span {
    font-weight: 700;
  }
`;

export const NoItems = styled.h3`
  margin-left: 20px;
`;

export const CartItemContainer = styled.div`
  ${(props) => (props.quantity > 0 ? (props.quantity > 1 ? 'height: 420px;' : 'height: 265px;') : 'height: 20px;')};
  padding: 0;
  overflow: hidden;
  ul {
    margin: 0;
  }
  &:hover {
    overflow-y: overlay;
  }
  > *:not(:last-child) {
    margin-bottom: 20px;
  }
  &::-webkit-scrollbar {
    background-color: transparent;
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #babac0;
    border-radius: 6px;
  }
  &::-webkit-scrollbar-button {
    display: none;
  }
`;

export const MiniCartTotal = styled.div`
  display: flex;
  justify-content: space-between;
  height: 32px;
  padding: 32px 16px;
  font-size: 16px;
  font-weight: 500;
  line-height: 32px;
  & span:nth-child(2) {
    font-weight: 700;
  }
`;

export const MiniCartButtons = styled.div`
  display: flex;
  gap: 12px;
  justify-content: space-between;
  width: 100%;
  height: 43px;
  box-sizing: border-box;
  padding: 0 16px;
`;

export const Button = styled.button`
  cursor: pointer;
  width: 100%;
  height: inherit;
  border: none;
  background: none;
  box-sizing: border-box;
  border: 1px solid transparent;
  font-family: Raleway;
  font-weight: 600;
  font-size: 14px;
  color: black;
`;

export const ViewBagButton = styled(Button)`
  border: 1px solid black;
  text-decoration: none;
  text-align: center;
  line-height: 43px;
  &:hover {
    background: #5ece7b;
    border: 1px solid #5ece7b;
    color: white;
  }
`;

export const CheckoutButton = styled(Button)`
  background: #5ece7b;
  color: white;
  &:hover {
    color: black;
    border: 1px solid black;
  }
`;
