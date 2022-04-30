import React from 'react';
import styled, { ThemeProvider, keyframes } from 'styled-components';
import BagImage from '../../assets/bag.png';
import CartIcon from '../../assets/cart-icon-white.svg';
import { Counter } from '../../feature/Counter/Counter';
import { CustomButton } from '../../feature/CustomButton/CustomButton';
import { ParamSwitcher } from '../../feature/Switcher/ParamSwitcher';

const theme = { primary: '#5ece7b' };

const ProductCardContainer = styled.div`
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

const ProductImage = styled.div`
  margin: 16px;
  height: 330px;
  width: 354px;
  background: url(${BagImage}) center no-repeat;
  background-size: 190%;
  border: none;
`;

const ProductDescription = styled.div`
  margin: 8px 16px;
  height: 58px;
  width: 354px;
`;

const ProductHeader = styled.h4`
  font-weight: 300;
`;

const ProductPrice = styled.p`
  font-weight: 500;
`;

const ProductBadge = styled.div`
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

const CartButton = styled.button`
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

const CartOverlay = styled.div`
  position: absolute;
  top: 0;
  z-index: 10;
  width: 386px;
  height: 444px;
`;

const CartInfoContainer = styled.div`
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

export class ProductCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isCartClicked: false };

    this.cartRef = React.createRef();
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.handleCartClicked = this.handleCartClicked.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  handleClickOutside(event) {
    if (this.cartRef && !this.cartRef.current.contains(event.target)) {
      this.setState({ isCartClicked: false });
      console.log('outside clicked!');
    }
  }

  handleCartClicked() {
    this.setState({ isCartClicked: true });
    console.log('Cart clicked!');
  }

  render() {
    const { isCartClicked } = this.state;
    return (
      <ThemeProvider theme={theme}>
        <ProductCardContainer isCartClicked={isCartClicked} ref={this.cartRef}>
          {isCartClicked && (
            <CartOverlay>
              <CartInfoContainer>
                <ParamSwitcher mini header="SIZE:" options={['S', 'M', 'L', 'XXXL', 'S', 'M', 'L', 'S', 'M']} />
                <ParamSwitcher mini header="COLOR:" options={['S', 'M', 'L', 'XXXL', 'S', 'M', 'L', 'S', 'M']} />
                <Counter />
                <CustomButton wide>ADD TO CART</CustomButton>
              </CartInfoContainer>
            </CartOverlay>
          )}
          <ProductImage>
            <ProductBadge>-50%</ProductBadge>
            <CartButton className="cart-button" onClick={this.handleCartClicked} />
          </ProductImage>
          <ProductDescription>
            <ProductHeader>Apollo Running Short</ProductHeader>
            <ProductPrice>$50.00</ProductPrice>
          </ProductDescription>
        </ProductCardContainer>
      </ThemeProvider>
    );
  }
}
