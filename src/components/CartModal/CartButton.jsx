import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CartImage from '../../assets/cart-icon.svg';
import { CartModal } from './CartModal';
import { MiniCart } from './MiniCart';

const CartIcon = styled.button`
  position: relative;
  border: none;
  width: 40px;
  height: 40px;
  background: url(${CartImage}) center no-repeat;
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

const ModalContainer = styled.div`
  position: absolute;
  display: flex;
  left: 0;
  top: 80px;
  width: 100%;
  height: 100%;
  background: rgba(57, 55, 72, 0.22);
  z-index: 10;
`;

export class CartButtonTemplate extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { isOpen: false };
    this.getQuantity = this.getQuantity.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.cartToggleRef = React.createRef();
  }

  getQuantity() {
    const quantity = this.props.cart.allIds.reduce((total, item) => total + this.props.cart.byIds[item].quantity, 0);
    return quantity;
  }

  toggleModal = () => {
    console.log(this.state.isOpen);
    // eslint-disable-next-line
    this.state.isOpen ? this.hideModal() : this.showModal();
    console.log(this.state.isOpen);
  };

  showModal = () => {
    this.setState({ isOpen: true });
    if (typeof window !== 'undefined' && window.document) {
      document.body.style.overflow = 'hidden';
    }
  };

  hideModal = () => {
    this.setState({ isOpen: false });
    document.body.style.overflow = 'unset';
  };

  render() {
    const { isOpen } = this.state;
    return (
      <>
        <CartIcon ref={this.cartToggleRef} onClick={this.toggleModal}>
          {this.getQuantity() > 0 && <CartBadge>{this.getQuantity()}</CartBadge>}
        </CartIcon>
        {isOpen && (
          <CartModal>
            <ModalContainer>
              <MiniCart hideModal={this.hideModal} cartToggleRef={this.cartToggleRef} />
            </ModalContainer>
          </CartModal>
        )}
      </>
    );
  }
}

function mapState(state) {
  const { products } = state;
  return { cart: products };
}

export const CartButton = connect(mapState)(CartButtonTemplate);

CartButtonTemplate.propTypes = {
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
