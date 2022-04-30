import React from 'react';
import styled from 'styled-components';
import { CustomButton } from '../feature/CustomButton/CustomButton';
import { Gallery } from '../feature/Gallery/Gallery';
import { ParamSwitcher } from '../feature/Switcher/ParamSwitcher';

const ProductPageContainer = styled.div`
  position: relative;
  width: 1440px;
  display: flex;
  flex-direction: row;
  flex: 1;
  align-items: flex-start;
  box-sizing: border-box;
  padding: 80px 100px 0;
  background: pink;
`;

const ProductInfoContainer = styled.article`
  width: 292px;
  min-height: 510px;
  background: lightgray;
`;

const ProductInfoHeader = styled.h2`
  font-weight: 600;
  font-size: 30px;
  line-height: 27px;
  margin-bottom: 16px;
`;

const ProductInfoType = styled.p`
  font-weight: 400;
  font-size: 30px;
  line-height: 27px;
  margin-bottom: 43px;
`;

const PriceContainer = styled.div`
  margin: 40px 0 20px;
`;

const PriceHeader = styled.p`
  font-family: Roboto Condensed;
  font-weight: 700;
  font-size: 18px;
  line-height: 18px;
`;

const PriceTag = styled.p`
  height: 46px;
  font-weight: 700;
  font-size: 24px;
  line-height: 46px;
`;

const Description = styled.p`
  margin-top: 40px;
  font-family: Roboto;
  font-weight: 400;
  font-size: 16px;
  line-height: 26px;
`;

export class ProductPage extends React.Component {
  render() {
    return (
      <ProductPageContainer>
        <Gallery />
        <ProductInfoContainer>
          <ProductInfoHeader>Apollo</ProductInfoHeader>
          <ProductInfoType>Running Short</ProductInfoType>
          <ParamSwitcher header="SIZE:" options={['S', 'M', 'L', 'XL']} />
          <PriceContainer>
            <PriceHeader>PRICE:</PriceHeader>
            <PriceTag>$50.00</PriceTag>
          </PriceContainer>
          <CustomButton>ADD TO CART</CustomButton>
          <Description>
            Find stunning women&apos;s cocktail dresses and party dresses. Stand out in lace and metallic cocktail dresses and party dresses
            from all your favorite brands.
          </Description>
        </ProductInfoContainer>
      </ProductPageContainer>
    );
  }
}
