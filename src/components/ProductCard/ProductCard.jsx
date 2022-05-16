import React from 'react';
import { connect } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { string, func, arrayOf, bool } from 'prop-types';
import { addToCart } from '../../redux/actions';
import { Counter } from '../../feature/Counter/ProductCardCounter/Counter';
import { CustomButton } from '../../feature/CustomButton/CustomButton';
import { ParamSwitcher } from '../../feature/Switcher/ParamSwitcher/ParamSwitcher';
import * as Styles from './styles';
import { attributesType, currencyType, pricesType } from '../../types';

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
    }
  }

  handleCartClicked() {
    this.setState({ isCartClicked: true });
    console.log('Cart clicked!');
  }

  addSwitcherState(attribute) {
    this.setState(({ options }) => ({ options: { ...options, ...attribute } }));
  }

  addQuantityState(number) {
    this.setState({ quantity: number });
  }

  render() {
    const { isCartClicked, options, quantity } = this.state;
    const { id, brand, name, gallery, attributes, prices, inStock, currency } = this.props;
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
  id: string.isRequired,
  brand: string.isRequired,
  name: string.isRequired,
  currency: currencyType.isRequired,
  addToCart: func.isRequired,
  gallery: arrayOf(string).isRequired,
  attributes: attributesType.isRequired,
  prices: pricesType.isRequired,
  inStock: bool.isRequired
};
