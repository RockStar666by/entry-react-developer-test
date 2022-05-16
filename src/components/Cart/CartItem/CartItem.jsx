import React from 'react';
import { ThemeProvider } from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteFromCart } from '../../../redux/actions';
import { Slider } from '../../../feature/ImageSlider/Slider';
import { ParamSwitcher } from '../../../feature/Switcher/ParamSwitcher/ParamSwitcher';
import { client } from '../../../apollo/apollo';
import { CartCounter } from '../../../feature/Counter/CartCounter/CartCounter';
import { PRODUCT } from '../../../queries/getProduct';
import * as Styles from './styles';

const theme = { primary: '#5ece7b' };

export class CartItemTemplate extends React.PureComponent {
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
        ],
        attributes: [],
        gallery: []
      }
    };
  }

  componentDidMount() {
    client.query({ query: PRODUCT, variables: { product: this.props.id } }).then((result) => {
      console.log(result);
      this.setState({ productData: result.data.product, loading: result.data.loading });
    });
  }

  render() {
    const { id, brand, name, options, prices, quantity, productId, currency, mini, miniCart, hideModal } = this.props;
    const { loading, productData } = this.state;
    const { attributes, gallery } = this.state.productData;
    console.log(attributes, id, options, prices, productData);
    return loading ? (
      <h2>LOADING...</h2>
    ) : (
      <ThemeProvider theme={theme}>
        <Styles.CartItemContainer mini={mini}>
          <Styles.DeleteButton mini={mini} className="delete-button" onClick={() => this.props.deleteFromCart(productId)} />
          <Styles.SettingsLeft>
            <Styles.CustomLink to={`/product/${id}`} onClick={hideModal}>
              <Styles.CartItemHeader mini={mini}>{brand}</Styles.CartItemHeader>
              <Styles.CartItemType mini={mini}>{name}</Styles.CartItemType>
            </Styles.CustomLink>
            <Styles.PriceTag mini={mini}>
              {prices[currency.index].currency.symbol}
              {(prices[currency.index].amount * quantity).toFixed(2)}
            </Styles.PriceTag>
            <Styles.ParamSwitcherContainer mini={mini}>
              {[...attributes]
                .sort((b, a) => a.type.localeCompare(b.type))
                .map((attribute) => (
                  <ParamSwitcher
                    mini={mini}
                    miniCart={miniCart}
                    key={attribute.id}
                    header={attribute.name}
                    options={attribute.items}
                    attrType={attribute.type}
                    addParentState={this.addSwitcherState}
                    selectedOption={options[attribute.name.toLowerCase()]}
                  />
                ))}
            </Styles.ParamSwitcherContainer>
          </Styles.SettingsLeft>
          <Styles.SettingsRight mini={mini}>
            <CartCounter mini={mini} quantity={quantity} productId={productId} />
            <Slider mini={mini} gallery={gallery} />
          </Styles.SettingsRight>
        </Styles.CartItemContainer>
      </ThemeProvider>
    );
  }
}

function mapState(state) {
  const { currency } = state;
  return { currency };
}

const actionCreators = { deleteFromCart };

export const CartItem = connect(mapState, actionCreators)(CartItemTemplate);

CartItemTemplate.propTypes = {
  hideModal: PropTypes.func,
  deleteFromCart: PropTypes.func.isRequired,
  mini: PropTypes.bool,
  miniCart: PropTypes.bool,
  currency: PropTypes.shape({
    index: PropTypes.number,
    label: PropTypes.string,
    symbol: PropTypes.string
  }).isRequired,
  id: PropTypes.string.isRequired,
  brand: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  productId: PropTypes.string.isRequired,
  options: PropTypes.objectOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      type: PropTypes.string,
      items: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string))
    })
  ).isRequired,
  prices: PropTypes.arrayOf(
    PropTypes.shape({
      currency: PropTypes.objectOf(PropTypes.string),
      amount: PropTypes.number
    })
  ).isRequired
};

CartItemTemplate.defaultProps = { mini: false, miniCart: false, hideModal: () => {} };
