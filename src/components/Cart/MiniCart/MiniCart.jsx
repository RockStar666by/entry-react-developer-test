import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { CartItem } from '../CartItem/CartItem';
import { clearCart } from '../../../redux/actions';
import * as Styles from './styles';

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
                {/* eslint-disable-next-line */}
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
  clearCart: PropTypes.func.isRequired,
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
