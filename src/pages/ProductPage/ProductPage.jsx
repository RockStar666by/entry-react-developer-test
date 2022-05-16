import React from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { string, shape, func } from 'prop-types';
import { Markup } from 'interweave';
import * as Styles from './styles';
import { addToCart } from '../../redux/actions';
import { CustomButton } from '../../feature/CustomButton/CustomButton';
import { Gallery } from '../../feature/Gallery/Gallery';
import { ParamSwitcher } from '../../feature/Switcher/ParamSwitcher/ParamSwitcher';
import { client } from '../../apollo/apollo';
import { PRODUCT } from '../../queries/getProduct';
import { currencyType } from '../../types';

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
    client.query({ query: PRODUCT, variables: { product: this.props.match.params.productId } }).then((result) => {
      this.setState({ productData: result.data.product, loading: result.data.loading });
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.match !== prevProps.match) {
      this.setState({ loading: true });
      client.query({ query: PRODUCT, variables: { product: this.props.match.params.productId } }).then((result) => {
        this.setState({ productData: result.data.product, loading: result.data.loading });
      });
    }
  }

  addSwitcherState(attribute) {
    this.setState(({ options }) => ({ options: { ...options, ...attribute } }));
  }

  render() {
    const { currency } = this.props;
    const { loading, options } = this.state;
    const { id, brand, name, description, inStock, gallery, prices, attributes } = this.state.productData;
    return loading ? (
      <h2>LOADING...</h2>
    ) : (
      <Styles.ProductPageContainer>
        <Gallery gallery={gallery} />
        <Styles.ProductInfoContainer>
          <Styles.ProductInfoHeader>{brand}</Styles.ProductInfoHeader>
          <Styles.ProductInfoType>{name}</Styles.ProductInfoType>
          {inStock ? (
            <>
              <Styles.ParamSwitchersContainer>
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
              </Styles.ParamSwitchersContainer>
              <Styles.PriceContainer>
                <Styles.PriceHeader>PRICE:</Styles.PriceHeader>
                <Styles.PriceTag>{`${prices[currency.index].currency.symbol} ${prices[currency.index].amount}`}</Styles.PriceTag>
              </Styles.PriceContainer>
              <CustomButton actionOnClick={() => this.props.addToCart({ id, name, brand, options, quantity: 1, prices })}>
                ADD TO CART
              </CustomButton>
            </>
          ) : (
            <>
              <Styles.PriceContainer>
                <Styles.PriceTag>OUT OF STOCK</Styles.PriceTag>
              </Styles.PriceContainer>
              <CustomButton>ADD TO WISHLIST</CustomButton>
            </>
          )}

          <Styles.Description>
            <Markup noWrap content={description} />
          </Styles.Description>
        </Styles.ProductInfoContainer>
      </Styles.ProductPageContainer>
    );
  }
}

function withRouter(WrappedComponent) {
  return function () {
    const match = { params: useParams() };
    return <WrappedComponent match={match} />;
  };
}

function mapState(state) {
  const { currency } = state;
  return { currency };
}

const actionCreators = { addToCart };

export const ProductPage = connect(mapState, actionCreators)(ProductPageTemplate);

export const ProductPageWithRouter = withRouter(ProductPage);

ProductPageTemplate.propTypes = {
  match: shape({ params: shape({ productId: string }) }).isRequired,
  addToCart: func.isRequired,
  currency: currencyType.isRequired
};
