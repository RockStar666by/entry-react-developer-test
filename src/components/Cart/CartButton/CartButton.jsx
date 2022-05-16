import React from 'react';
import { connect } from 'react-redux';
import { Modal } from '../../Modal/Modal';
import { MiniCart } from '../MiniCart/MiniCart';
import * as Styles from './styles';
import { cartType } from '../../../types';

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
    if (this.state.isOpen) {
      this.hideModal();
    } else {
      this.showModal();
    }
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
        <Styles.CartIcon ref={this.cartToggleRef} onClick={this.toggleModal}>
          {this.getQuantity() > 0 && <Styles.CartBadge>{this.getQuantity()}</Styles.CartBadge>}
        </Styles.CartIcon>
        {isOpen && (
          <Modal>
            <Styles.ModalContainer>
              <MiniCart hideModal={this.hideModal} cartToggleRef={this.cartToggleRef} />
            </Styles.ModalContainer>
          </Modal>
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

CartButtonTemplate.propTypes = { cart: cartType.isRequired };
