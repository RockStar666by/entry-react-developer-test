import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as Styles from './styles';
import { CartItem } from '../../components/Cart/CartItem/CartItem';
import { CustomButton } from '../../feature/CustomButton/CustomButton';
import { clearCart } from '../../redux/actions';

export class CartPageTemplate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.getSum = this.getSum.bind(this);
    this.getTotal = this.getTotal.bind(this);
    this.getTaxes = this.getTaxes.bind(this);
    this.getQuantity = this.getQuantity.bind(this);
  }

  getSum() {
    const totalSum = this.props.cart.allIds
      .reduce(
        (total, item) =>
          total + this.props.cart.byIds[item].prices[this.props.currency.index].amount * this.props.cart.byIds[item].quantity,
        0
      )
      .toFixed(2);
    return totalSum;
  }

  getTotal() {
    const total = this.getSum();
    return `${this.props.currency.symbol}${total}`;
  }

  getQuantity() {
    const quantity = this.props.cart.allIds.reduce((total, item) => total + this.props.cart.byIds[item].quantity, 0);
    return quantity;
  }

  getTaxes() {
    const total = this.getSum();
    return `${this.props.currency.symbol}${(total * 0.21).toFixed(2)}`;
  }

  render() {
    const { allIds, byIds } = this.props.cart;
    console.log(allIds, byIds);
    return (
      <Styles.CartPageContainer>
        <Styles.CartHeader>CART</Styles.CartHeader>
        {this.getQuantity() === 0 ? (
          <h2>No items in cart.</h2>
        ) : (
          <>
            <Styles.CartItemsContainer>
              {allIds.map((elem) => {
                console.log(elem, byIds[elem]);
                const { id, brand, name, options, prices, quantity } = byIds[elem];
                return (
                  <CartItem
                    key={elem}
                    id={id}
                    brand={brand}
                    name={name}
                    options={options}
                    prices={prices}
                    quantity={quantity}
                    productId={elem}
                  />
                );
              })}
            </Styles.CartItemsContainer>
            <Styles.CheckoutContainer>
              <Styles.CheckoutGrid>
                <Styles.GridRow>
                  <Styles.GridName>Tax 21%:</Styles.GridName>
                  <Styles.GridValue>{this.getTaxes()}</Styles.GridValue>
                </Styles.GridRow>
                <Styles.GridRow>
                  <Styles.GridName>Quantity:</Styles.GridName>
                  <Styles.GridValue>{this.getQuantity()}</Styles.GridValue>
                </Styles.GridRow>
                <Styles.GridRow>
                  <Styles.GridName>Total:</Styles.GridName>
                  <Styles.GridValue>{this.getTotal()}</Styles.GridValue>
                </Styles.GridRow>
              </Styles.CheckoutGrid>
              <CustomButton actionOnClick={this.props.clearCart}>ORDER</CustomButton>
            </Styles.CheckoutContainer>
          </>
        )}
      </Styles.CartPageContainer>
    );
  }
}

function mapState(state) {
  const { products, currency } = state;
  return { cart: products, currency };
}

const actionCreators = { clearCart };

export const CartPage = connect(mapState, actionCreators)(CartPageTemplate);

CartPageTemplate.propTypes = {
  clearCart: PropTypes.func.isRequired,
  currency: PropTypes.shape({
    index: PropTypes.number,
    label: PropTypes.string,
    symbol: PropTypes.string
  }).isRequired,
  cart: PropTypes.shape({
    allIds: PropTypes.arrayOf(PropTypes.string),
    byIds: PropTypes.objectOf(
      PropTypes.shape({
        id: PropTypes.string,
        brand: PropTypes.string,
        name: PropTypes.string,
        quantity: PropTypes.number,
        options: PropTypes.objectOf(
          PropTypes.shape({
            id: PropTypes.string,
            name: PropTypes.string,
            type: PropTypes.string,
            items: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string))
          })
        ),
        prices: PropTypes.arrayOf(
          PropTypes.shape({
            currency: PropTypes.objectOf(PropTypes.string),
            amount: PropTypes.number
          })
        ),
        gallery: PropTypes.arrayOf(PropTypes.string)
      })
    )
  }).isRequired
};
