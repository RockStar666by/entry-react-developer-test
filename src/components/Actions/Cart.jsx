import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CartIcon from '../../assets/cart-icon.svg';

const CartButton = styled.button`
  position: relative;
  border: none;
  width: 40px;
  height: 40px;
  background: url(${CartIcon}) center no-repeat;
  &:hover {
    filter: invert(71%) sepia(62%) saturate(350%) hue-rotate(82deg) brightness(88%) contrast(93%);
  }
`;

const CartBadge = styled.div`
  position: absolute;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: black;
  color: white;
  text-align: center;
  line-height: 20px;
  top: 0;
  right: 0;
`;
export class CartTemplate extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
    this.getQuantity = this.getQuantity.bind(this);
  }

  getQuantity() {
    const quantity = this.props.cart.allIds.reduce((total, item) => total + this.props.cart.byIds[item].quantity, 0);
    return quantity;
  }

  render() {
    return <CartButton>{this.getQuantity() > 0 && <CartBadge>{this.getQuantity()}</CartBadge>}</CartButton>;
  }
}

function mapState(state) {
  const { products } = state;
  return { cart: products };
}

export const Cart = connect(mapState)(CartTemplate);

CartTemplate.propTypes = {
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
