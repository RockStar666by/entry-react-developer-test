import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { func } from 'prop-types';
import { CartItem } from '../CartItem/CartItem';
import { clearCart } from '../../../redux/actions';
import * as Styles from './styles';
import { currencyType, cartType, refType } from '../../../types';

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
      <Styles.MiniCartWrapper>
        <Styles.MiniCartContainer quantity={allIds.length} ref={this.wrapperRef}>
          {allIds.length > 0 ? (
            <>
              <Styles.CartHeader>
                <span>My bag,</span> {this.getQuantity()} items
              </Styles.CartHeader>
              <Styles.CartItemContainer quantity={allIds.length}>
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
                      hideModal={hideModal}
                    />
                  );
                })}
              </Styles.CartItemContainer>
              <Styles.MiniCartTotal>
                <span>Total</span>
                <span>{this.getTotal()}</span>
              </Styles.MiniCartTotal>
              <Styles.MiniCartButtons>
                <Styles.ViewBagButton as={NavLink} to="/cart" onClick={hideModal}>
                  VIEW BAG
                </Styles.ViewBagButton>
                <Styles.CheckoutButton onClick={this.props.clearCart}>CHECK OUT</Styles.CheckoutButton>
              </Styles.MiniCartButtons>
            </>
          ) : (
            <Styles.NoItems>No items in cart.</Styles.NoItems>
          )}
        </Styles.MiniCartContainer>
      </Styles.MiniCartWrapper>
    );
  }
}

function mapState(state) {
  const { products, currency } = state;
  return { cart: products, currency };
}

const actionCreators = { clearCart };

export const MiniCart = connect(mapState, actionCreators)(MiniCartTemplate);

MiniCartTemplate.propTypes = {
  clearCart: func.isRequired,
  cartToggleRef: refType.isRequired,
  hideModal: func.isRequired,
  currency: currencyType.isRequired,
  cart: cartType.isRequired
};
