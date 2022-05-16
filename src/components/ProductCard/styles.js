import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import CartIcon from '../../assets/cart-icon-white.svg';

export const ProductCardContainer = styled.div`
  position: relative;
  width: 386px;
  height: 444px;
  display: flex;
  flex-direction: column;
  background: white;
  font-size: 18px;
  line-height: 30px;
  overflow: hidden;
  ${(props) => props.isCartClicked && 'filter: drop-shadow(0px 4px 35px rgba(168, 172, 176, 0.19))'};
  &:hover {
    filter: drop-shadow(0px 4px 35px rgba(168, 172, 176, 0.19));
    .cart-button {
      opacity: 1;
    }
  }
`;

export const ProductCardBox = styled(Link)`
  text-decoration: none;
  color: black;
`;

export const ProductImage = styled.div`
  margin: 16px;
  height: 330px;
  width: 354px;
  background: url(${(props) => props.bgImage}) center no-repeat;
  background-size: auto 100%;
  border: none;
`;

export const ProductDescription = styled.div`
  margin: 8px 16px;
  height: 58px;
  width: 354px;
`;

export const ProductHeader = styled.h4`
  font-weight: 300;
  margin: 0;
`;

export const ProductPrice = styled.p`
  font-weight: 500;
  margin: 0;
`;

export const ProductBadge = styled.div`
  position: relative;
  top: 8px;
  width: 61px;
  height: 35px;
  color: white;
  font-size: 12px;
  font-weight: 600;
  line-height: 35px;
  text-align: center;
  background: ${(props) => props.theme.primary};
  opacity: 0;
`;

export const CartButton = styled.button`
  cursor: pointer;
  position: absolute;
  width: 52px;
  height: 52px;
  right: 30px;
  top: 320px;
  border: none;
  border-radius: 50px;
  background: url(${CartIcon}) center no-repeat;
  background-size: 24px;
  background-color: ${(props) => props.theme.primary};
  filter: drop-shadow(0px 4px 11px rgba(29, 31, 34, 0.1));
  opacity: 0;
  transition: opacity 0.1s ease-in-out;
}`;

const slideInFromBottom = keyframes` 
  0% {
    transform: translateY(100%);
  }
  100% {
    transform: translateY(0);
  }
`;

export const CartOverlay = styled.div`
  position: absolute;
  top: 0;
  z-index: 10;
  width: 386px;
  height: 444px;
`;

export const CartInfoContainer = styled.div`
  position: absolute;
  bottom: 0;
  width: calc(100%);
  min-height: 100px;
  background: white;
  box-sizing: border-box;
  padding: 16px;
  filter: drop-shadow(0px 4px 11px rgba(29, 31, 34, 0.1));
  animation: 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s 1 ${slideInFromBottom};
`;

export const CartHeader = styled.h2`
  margin: 0;
  height: 46px;
  font-weight: 700;
  font-size: 24px;
  line-height: 46px;
`;
