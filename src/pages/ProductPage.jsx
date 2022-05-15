import React from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { gql } from '@apollo/client';
import { Markup } from 'interweave';
import { addToCart } from '../redux/actions';
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
      __typename @skip(if: true)
      attributes {
        id
        name
        type
        __typename @skip(if: true)
        items {
          displayValue
          value
          id
          __typename @skip(if: true)
        }
      }
      prices {
        __typename @skip(if: true)
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

const ParamSwitchersContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
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

export class ProductPageTemplate extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      productData: {
        prices: [
          {
            currency: {
              label: '',
              symbol: ''
            },
            amount: ''
          }
        ]
      },
      loading: true,
      options: {}
    };
    this.addSwitcherState = this.addSwitcherState.bind(this);
  }

  componentDidMount() {
    client.query({ query: PRODUCT_PAGE, variables: { product: this.props.match.params.productId } }).then((result) => {
      console.log(result);
      this.setState({ productData: result.data.product, loading: result.data.loading });
    });
  }

  addSwitcherState(attribute) {
    console.log(attribute);
    this.setState(({ options }) => ({ options: { ...options, ...attribute } }));
  }

  render() {
    const { currency } = this.props;
    const { loading, options } = this.state;
    const { id, brand, name, description, inStock, gallery, prices, attributes } = this.state.productData;
    console.log(attributes);
    return loading ? (
      <h2>LOADING...</h2>
    ) : (
      <ProductPageContainer>
        <Gallery gallery={gallery} />
        <ProductInfoContainer>
          <ProductInfoHeader>{brand}</ProductInfoHeader>
          <ProductInfoType>{name}</ProductInfoType>
          {inStock ? (
            <>
              <ParamSwitchersContainer>
                {[...attributes]
                  .sort((b, a) => a.type.localeCompare(b.type))
                  .map((attribute) => (
                    <ParamSwitcher
                      key={attribute.id}
                      header={attribute.name.toUpperCase()}
                      options={attribute.items}
                      attrType={attribute.type}
                      addParentState={this.addSwitcherState}
                    />
                  ))}
              </ParamSwitchersContainer>
              <PriceContainer>
                <PriceHeader>PRICE:</PriceHeader>
                <PriceTag>{`${prices[currency.index].currency.symbol} ${prices[currency.index].amount}`}</PriceTag>
              </PriceContainer>
              <CustomButton actionOnClick={() => this.props.addToCart({ id, name, brand, options, quantity: 1, prices })}>
                ADD TO CART
              </CustomButton>
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

function mapState(state) {
  const { currency } = state;
  return { currency };
}

const actionCreators = { addToCart };

export const ProductPage = connect(mapState, actionCreators)(ProductPageTemplate);

export const ProductPageWithRouter = withRouter(ProductPage);

ProductPageTemplate.propTypes = {
  match: PropTypes.shape({ params: PropTypes.shape({ productId: PropTypes.string }) }).isRequired,
  addToCart: PropTypes.func.isRequired,
  currency: PropTypes.shape({
    index: PropTypes.number,
    label: PropTypes.string,
    symbol: PropTypes.string
  }).isRequired
};
