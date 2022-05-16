import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Modal } from '../../Modal/Modal';
import { MiniCart } from '../MiniCart/MiniCart';
import * as Styles from './styles';

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