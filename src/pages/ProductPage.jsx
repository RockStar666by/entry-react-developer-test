import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { gql } from '@apollo/client';
import { Markup } from 'interweave';
import { CustomButton } from '../feature/CustomButton/CustomButton';
import { Gallery } from '../feature/Gallery/Gallery';
import { ParamSwitcher } from '../feature/Switcher/ParamSwitcher';
import { client } from '../apollo/apollo';

const PRODUCT_PAGE = gql`
  query GetProduct($product: String!) {
    product(id: $product) {
      id
      name
      inStock
      gallery
      description
      category
      attributes {
        id
        name
        type
        items {
          displayValue
          value
          id
        }
      }
      prices {
        currency {
          label
          symbol
        }
        amount
      }
      brand
    }
  }
`;

const ProductPageContainer = styled.div`
  position: relative;
  width: 1440px;
  display: flex;
  flex-direction: row;
  flex: 1;
  align-items: flex-start;
  box-sizing: border-box;
  padding: 80px 100px 0;
  margin-bottom: 100px;
`;

const ProductInfoContainer = styled.article`
  width: 292px;
  min-height: 510px;
`;

const ProductInfoHeader = styled.h2`
  margin: 0;
  font-weight: 600;
  font-size: 30px;
  line-height: 27px;
  margin-bottom: 16px;
`;

const ProductInfoType = styled.p`
  margin: 0;
  font-weight: 400;
  font-size: 30px;
  line-height: 27px;
  margin-bottom: 43px;
`;

const PriceContainer = styled.div`
  margin: 40px 0 20px;
`;

const PriceHeader = styled.p`
  margin: 0;
  font-family: Roboto Condensed;
  font-weight: 700;
  font-size: 18px;
  line-height: 18px;
`;

const PriceTag = styled.p`
  margin: 0;
  height: 46px;
  font-weight: 700;
  font-size: 24px;
  line-height: 46px;
`;

const Description = styled.div`
  margin-top: 40px;
  font-family: Roboto;
  font-weight: 400;
  font-size: 16px;
  line-height: 26px;
  max-height: 400px;
  overflow: hidden;
  ul {
    margin: 0;
    padding-left: 20px;
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

// eslint-disable-next-line
const withRouter = (WrappedComponent) => () => {
  const match = { params: useParams() };
  return <WrappedComponent match={match} />;
};

export class ProductPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { productData: {}, loading: true };
  }

  // jacket-canada-goosee

  componentDidMount() {
    client.query({ query: PRODUCT_PAGE, variables: { product: this.props.match.params.productId } }).then((result) => {
      console.log(result);
      this.setState({ productData: result.data.product, loading: result.data.loading });
    });
  }

  render() {
    const { loading } = this.state;
    const { brand, name, description, inStock, gallery, prices, attributes } = this.state.productData;
    return loading ? (
      <p>LOADING...</p>
    ) : (
      <ProductPageContainer>
        <Gallery gallery={gallery} />
        <ProductInfoContainer>
          <ProductInfoHeader>{brand}</ProductInfoHeader>
          <ProductInfoType>{name}</ProductInfoType>

          {inStock ? (
            <>
              {[...attributes]
                .sort((b, a) => a.type.localeCompare(b.type))
                .map((attribute) => (
                  <ParamSwitcher
                    key={attribute.id}
                    header={`${attribute.name.toUpperCase()}:`}
                    options={attribute.items}
                    attrType={attribute.type}
                  />
                ))}
              <PriceContainer>
                <PriceHeader>PRICE:</PriceHeader>
                <PriceTag>
                  {prices[0].currency.symbol}
                  {prices[0].amount}
                </PriceTag>
              </PriceContainer>
              <CustomButton>ADD TO CART</CustomButton>
            </>
          ) : (
            <>
              <PriceContainer>
                <PriceTag>OUT OF STOCK</PriceTag>
              </PriceContainer>
              <CustomButton>ADD TO WISHLIST</CustomButton>
            </>
          )}

          <Description>
            <Markup noWrap content={description} />
          </Description>
        </ProductInfoContainer>
      </ProductPageContainer>
    );
  }
}

export const ProductPageWithRouter = withRouter(ProductPage);

ProductPage.propTypes = { match: PropTypes.shape({ params: PropTypes.shape({ productId: PropTypes.string }) }).isRequired };
