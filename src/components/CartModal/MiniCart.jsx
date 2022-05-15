import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { CartItem } from '../CartItem/CartItem';

const MiniCartWrapper = styled.div`
  position: relative;
  margin: 0 auto;
  display: flex;
  flex-direction: row-reverse;
  width: 100%;
  max-width: 1440px;
  box-sizing: border-box;
  padding: 0 100px;
`;

const MiniCartContainer = styled.div`
  position: relative;
  right: -28px;
  width: 325px;
  height: 680px;
  background: white;
  overflow: hidden;
`;

const CartHeader = styled.p`
  margin: 32px 16px;
  font-size: 16px;
  & span {
    font-weight: 700;
  }
`;

const CartItemContainer = styled.div`
  height: 420px;
  padding: 0;
  overflow: hidden;
  ul {
    margin: 0;
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

const MiniCartTotal = styled.div`
  display: flex;
  justify-content: space-between;
  height: 32px;
  padding: 32px 16px;
  font-size: 16px;
  font-weight: 500;
  line-height: 32px;
  & span:nth-child(2) {
    font-weight: 700;
  }
`;

const MiniCartButtons = styled.div`
  display: flex;
  gap: 12px;
  justify-content: space-between;
  width: 100%;
  height: 43px;
  box-sizing: border-box;
  padding: 0 16px;
`;

const Button = styled.button`
  cursor: pointer;
  width: 100%;
  height: inherit;
  border: none;
  background: none;
  box-sizing: border-box;
  border: 1px solid transparent;
  font-family: Raleway;
  font-weight: 600;
  font-size: 14px;
  color: black;
`;

const ViewBagButton = styled(Button)`
  border: 1px solid black;
  text-decoration: none;
  text-align: center;
  line-height: 43px;
  &:hover {
    background: #5ece7b;
    border: 1px solid #5ece7b;
    color: white;
  }
`;

const CheckoutButton = styled(Button)`
  background: #5ece7b;
  color: white;
  &:hover {
    color: black;
    border: 1px solid black;
  }
`;

export class MiniCartTemplate extends React.PureComponent {
  constructor(props) {
    super(props);
    this.getQuantity = this.getQuantity.bind(this);
    this.wrapperRef = React.createRef();
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  handleClickOutside(event) {
    console.log(!this.props.cartToggleRef.current.contains(event.target));
    if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
      if (!this.props.cartToggleRef.current.contains(event.target)) {
        this.props.hideModal();
      }
    }
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

  render() {
    const { allIds, byIds } = this.props.cart;
    const { hideModal } = this.props;
    return (
      <MiniCartWrapper>
        <MiniCartContainer ref={this.wrapperRef}>
          <CartHeader>
            {/* eslint-disable-next-line */}
            <span>My bag,</span> {this.getQuantity()} items
          </CartHeader>
          <CartItemContainer>
            {allIds.map((elem) => {
              console.log(elem, byIds[elem]);
              const { id, brand, name, options, prices, quantity } = byIds[elem];
              return (
                <CartItem
                  mini
                  miniCart
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
          </CartItemContainer>
          <MiniCartTotal>
            <span>Total</span>
            <span>{this.getTotal()}</span>
          </MiniCartTotal>
          <MiniCartButtons>
            <ViewBagButton as={NavLink} to="/cart" onClick={hideModal}>
              VIEW BAG
            </ViewBagButton>
            <CheckoutButton>CHECK OUT</CheckoutButton>
          </MiniCartButtons>
        </MiniCartContainer>
      </MiniCartWrapper>
    );
  }
}

function mapState(state) {
  const { products, currency } = state;
  return { cart: products, currency };
}

export const MiniCart = connect(mapState)(MiniCartTemplate);

MiniCartTemplate.propTypes = {
  cartToggleRef: PropTypes.oneOfType([PropTypes.func, PropTypes.shape({ current: PropTypes.instanceOf(Element) })]).isRequired,
  hideModal: PropTypes.func.isRequired,
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
