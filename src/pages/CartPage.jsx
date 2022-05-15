import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { CartItem } from '../components/CartItem/CartItem';
import { addToCart } from '../redux/actions';
import { CustomButton } from '../feature/CustomButton/CustomButton';

const CartPageContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1440px;
  box-sizing: border-box;
  padding: 80px 100px 0;
  margin-bottom: 275px;
`;

const CartHeader = styled.h1`
  margin: 0;
  margin-bottom: 55px;
  font-weight: 700;
  font-size: 32px;
  line-height: 40px;
  text-transform: uppercase;
  color: #1d1f22;
`;

const CartItemsContainer = styled.div``;
const CheckoutContainer = styled.div``;
const CheckoutGrid = styled.div``;
const GridRow = styled.p`
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-gap: 10px;
  grid-template-areas: 'attributeName attributeValue';
  font-size: 24px;
  line-height: 28px;
`;
const GridName = styled.span`
  font-weight: 400;
`;
const GridValue = styled.span`
  font-weight: 700;
`;

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
      <CartPageContainer>
        <CartHeader>CART</CartHeader>
        {this.getQuantity() === 0 ? (
          <h2>No items in cart.</h2>
        ) : (
          <>
            <CartItemsContainer>
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
            </CartItemsContainer>
            <CheckoutContainer>
              <CheckoutGrid>
                <GridRow>
                  <GridName>Tax 21%:</GridName>
                  <GridValue>{this.getTaxes()}</GridValue>
                </GridRow>
                <GridRow>
                  <GridName>Quantity:</GridName>
                  <GridValue>{this.getQuantity()}</GridValue>
                </GridRow>
                <GridRow>
                  <GridName>Total:</GridName>
                  <GridValue>{this.getTotal()}</GridValue>
                </GridRow>
              </CheckoutGrid>
              <CustomButton>ORDER</CustomButton>
            </CheckoutContainer>
          </>
        )}
      </CartPageContainer>
    );
  }
}

function mapState(state) {
  const { products, currency } = state;
  return { cart: products, currency };
}

const actionCreators = { addToCart };

export const CartPage = connect(mapState, actionCreators)(CartPageTemplate);

CartPageTemplate.propTypes = {
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
