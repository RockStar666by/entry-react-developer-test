import React from 'react';
import { connect } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import PropTypes from 'prop-types';
import { addToCart } from '../../redux/actions';
import { Counter } from '../../feature/Counter/ProductCardCounter/Counter';
import { CustomButton } from '../../feature/CustomButton/CustomButton';
import { ParamSwitcher } from '../../feature/Switcher/ParamSwitcher/ParamSwitcher';
import * as Styles from './styles';

const theme = { primary: '#5ece7b' };
export class ProductCardTemplate extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { isCartClicked: false, options: {}, quantity: '' };

    this.cartRef = React.createRef();
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.handleCartClicked = this.handleCartClicked.bind(this);
    this.addSwitcherState = this.addSwitcherState.bind(this);
    this.addQuantityState = this.addQuantityState.bind(this);
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

  addSwitcherState(attribute) {
    console.log(attribute);
    this.setState(({ options }) => ({ options: { ...options, ...attribute } }));
  }

  addQuantityState(number) {
    console.log(number);
    this.setState({ quantity: number });
  }

  render() {
    const { isCartClicked, options, quantity } = this.state;
    // eslint-disable-next-line
    const { id, brand, name, gallery, attributes, prices, addedProducts, inStock, currency } = this.props;
    console.log(id, addedProducts, this.state, currency);
    return (
      <ThemeProvider theme={theme}>
        <Styles.ProductCardContainer isCartClicked={isCartClicked} ref={this.cartRef}>
          {isCartClicked && (
            <Styles.CartOverlay>
              {inStock ? (
                <Styles.CartInfoContainer>
                  {[...attributes]
                    .sort((b, a) => a.type.localeCompare(b.type))
                    .map((attribute) => (
                      <ParamSwitcher
                        key={attribute.id}
                        mini
                        header={attribute.name}
                        options={attribute.items}
                        attrType={attribute.type}
                        addParentState={this.addSwitcherState}
                      />
                    ))}
                  <Counter addParentState={this.addQuantityState} />
                  <CustomButton wide actionOnClick={() => this.props.addToCart({ id, name, brand, options, quantity, prices })}>
                    ADD TO CART
                  </CustomButton>
                </Styles.CartInfoContainer>
              ) : (
                <Styles.CartInfoContainer>
                  <Styles.CartHeader>OUT OF STOCK</Styles.CartHeader>
                  <CustomButton wide>ADD TO WISHLIST</CustomButton>
                </Styles.CartInfoContainer>
              )}
            </Styles.CartOverlay>
          )}
          <Styles.ProductCardBox to={`/product/${id}`}>
            <Styles.ProductImage bgImage={gallery[0]}>
              <Styles.ProductBadge>-50%</Styles.ProductBadge>
            </Styles.ProductImage>
            <Styles.ProductDescription>
              <Styles.ProductHeader>{`${brand} ${name}`}</Styles.ProductHeader>
              <Styles.ProductPrice>{`${prices[currency.index].currency.symbol} ${prices[currency.index].amount}`}</Styles.ProductPrice>
            </Styles.ProductDescription>
          </Styles.ProductCardBox>
          <Styles.CartButton className="cart-button" onClick={this.handleCartClicked} />
        </Styles.ProductCardContainer>
      </ThemeProvider>
    );
  }
}

function mapState(state) {
  const { products, currency } = state;
  return { addedProducts: products, currency };
}

const actionCreators = { addToCart };

export const ProductCard = connect(mapState, actionCreators)(ProductCardTemplate);

ProductCardTemplate.propTypes = {
  id: PropTypes.string.isRequired,
  brand: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  currency: PropTypes.shape({
    index: PropTypes.number,
    label: PropTypes.string,
    symbol: PropTypes.string
  }).isRequired,
  addToCart: PropTypes.func.isRequired,
  gallery: PropTypes.arrayOf(PropTypes.string).isRequired,
  attributes: PropTypes.arrayOf(
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
