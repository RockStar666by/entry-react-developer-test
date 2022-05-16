import styled from 'styled-components';
import CartImage from '../../../assets/cart-icon.svg';

export const CartIcon = styled.button`
  position: relative;
  border: none;
  width: 40px;
  height: 40px;
  background: url(${CartImage}) center no-repeat;
  &:hover {
    filter: invert(71%) sepia(62%) saturate(350%) hue-rotate(82deg) brightness(88%) contrast(93%);
  }
`;

export const CartBadge = styled.div`
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

export const ModalContainer = styled.div`
  position: absolute;
  display: flex;
  left: 0;
  top: 80px;
  width: 100%;
  height: 100%;
  background: rgba(57, 55, 72, 0.22);
  z-index: 10;
`;
