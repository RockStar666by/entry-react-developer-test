import React from 'react';
import { Link } from 'react-router-dom';
import styled, { ThemeProvider, css } from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteFromCart } from '../../redux/actions';
import { Slider } from '../../feature/ImageSlider/Slider';
import { ParamSwitcher } from '../../feature/Switcher/ParamSwitcher';
import { client } from '../../apollo/apollo';
import { CartCounter } from '../../feature/Counter/CartCounter';
import DeleteIcon from '../../assets/delete-button.svg';
import { PRODUCT } from '../../queries/getProduct';

const theme = { primary: '#5ece7b' };

const CartItemContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 336px;

  border-bottom: ${(props) => (props.mini ? 'none' : '1px solid #e5e5e5')};
  &:first-child {
    border-top: ${(props) => (props.mini ? 'none' : '1px solid #e5e5e5')};
  }

  &:hover {
    .delete-button {
      opacity: 0.2;
    }
  }
  ${(props) =>
    props.mini &&
    `box-sizing: border-box;
    border-left: 6px solid transparent;
    padding: 0 16px 0 10px;
    height: auto;
    min-height: 190px;
    &:hover {
    border-left: 6px solid #5ece7b;
  }`};
`;

const SmallDeleteButton = css`
  width: 24px;
  height: 24px;
  right: 16px;
  top: 0px;
  background-size: 16px;
`;

const BigDeleteButton = css`
  width: 45px;
  height: 45px;
  right: 24px;
  top: 24px;
  background-size: 24px;
`;

const DeleteButton = styled.button`
  cursor: pointer;
  position: absolute;
  border: 1px solid black;
  background: url(${DeleteIcon}) center no-repeat;
  ${(props) => (props.mini ? `${SmallDeleteButton}` : `${BigDeleteButton}`)}
  opacity: 0;
  transition: opacity 0.2s ease-in-out;
  z-index: 1;
  &:hover {
    filter: invert(20%) sepia(89%) saturate(7314%) hue-rotate(357deg) brightness(92%) contrast(119%);
    opacity: 1 !important;
  }
`;

const CustomLink = styled(Link)`
  text-decoration: none;
  color: black;
  &:hover {
    text-decoration: underline;
  }
`;

const SettingsLeft = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;

const SettingsRight = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: ${(props) => (props.mini ? '0' : '24px 0')};
`;

const BigHeader = css`
  margin: 24px 0 0;
  font-weight: 600;
  font-size: 30px;
  line-height: 27px;
`;

const SmallHeader = css`
  margin: 0;
  font-weight: 300;
  font-size: 16px;
  line-height: 26px;
`;

const CartItemHeader = styled.h2`
  ${(props) => (props.mini ? `${SmallHeader}` : `${BigHeader}`)};
`;

const BigType = css`
  margin: 16px 0 0;
  font-weight: 400;
  font-size: 30px;
  line-height: 27px;
`;

const CartItemType = styled.p`
  ${(props) => (props.mini ? `${SmallHeader}` : `${BigType}`)};
`;

const ParamSwitcherContainer = styled.div`
  display: flex;
  flex-flow: column wrap;
  ${(props) => (props.mini ? 'height: auto;' : 'height: 180px;')};
  column-gap: 40px;
  pointer-events: none;
`;

const BigPriceTag = css`
  margin: 20px 0 20px;
  height: 24px;
  font-weight: 700;
  font-size: 24px;
  line-height: 24px;
`;

const SmallPriceTag = css`
  margin: 0;
  font-weight: 500;
  font-size: 16px;
  line-height: 34px;
`;

const PriceTag = styled.p`
  ${(props) => (props.mini ? `${SmallPriceTag}` : `${BigPriceTag}`)};
`;

export class CartItemTemplate extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      productData: {
        prices: [
          {
            currency: {
              label: '',
              symbol: ''
            },
            amount: ''
          }
        ],
        attributes: [],
        gallery: []
      }
    };
  }

  componentDidMount() {
    client.query({ query: PRODUCT, variables: { product: this.props.id } }).then((result) => {
      console.log(result);
      this.setState({ productData: result.data.product, loading: result.data.loading });
    });
  }

  render() {
    const { id, brand, name, options, prices, quantity, productId, currency, mini, miniCart, hideModal } = this.props;
    const { loading, productData } = this.state;
    const { attributes, gallery } = this.state.productData;
    console.log(attributes, id, options, prices, productData);
    return loading ? (
      <h2>LOADING...</h2>
    ) : (
      <ThemeProvider theme={theme}>
        <CartItemContainer mini={mini}>
          <DeleteButton mini={mini} className="delete-button" onClick={() => this.props.deleteFromCart(productId)} />
          <SettingsLeft>
            <CustomLink to={`/product/${id}`} onClick={hideModal}>
              <CartItemHeader mini={mini}>{brand}</CartItemHeader>
              <CartItemType mini={mini}>{name}</CartItemType>
            </CustomLink>
            <PriceTag mini={mini}>
              {prices[currency.index].currency.symbol}
              {(prices[currency.index].amount * quantity).toFixed(2)}
            </PriceTag>
            <ParamSwitcherContainer mini={mini}>
              {[...attributes]
                .sort((b, a) => a.type.localeCompare(b.type))
                .map((attribute) => (
                  <ParamSwitcher
                    mini={mini}
                    miniCart={miniCart}
                    key={attribute.id}
                    header={attribute.name}
                    options={attribute.items}
                    attrType={attribute.type}
                    addParentState={this.addSwitcherState}
                    selectedOption={options[attribute.name.toLowerCase()]}
                  />
                ))}
            </ParamSwitcherContainer>
          </SettingsLeft>
          <SettingsRight mini={mini}>
            <CartCounter mini={mini} quantity={quantity} productId={productId} />
            <Slider mini={mini} gallery={gallery} />
          </SettingsRight>
        </CartItemContainer>
      </ThemeProvider>
    );
  }
}

function mapState(state) {
  const { currency } = state;
  return { currency };
}

const actionCreators = { deleteFromCart };

export const CartItem = connect(mapState, actionCreators)(CartItemTemplate);

CartItemTemplate.propTypes = {
  hideModal: PropTypes.func,
  deleteFromCart: PropTypes.func.isRequired,
  mini: PropTypes.bool,
  miniCart: PropTypes.bool,
  currency: PropTypes.shape({
    index: PropTypes.number,
    label: PropTypes.string,
    symbol: PropTypes.string
  }).isRequired,
  id: PropTypes.string.isRequired,
  brand: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  productId: PropTypes.string.isRequired,
  options: PropTypes.objectOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      type: PropTypes.string,
      items: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string))
    })
  ).isRequired,
  prices: PropTypes.arrayOf(
    PropTypes.shape({
      currency: PropTypes.objectOf(PropTypes.string),
      amount: PropTypes.number
    })
  ).isRequired
};

CartItemTemplate.defaultProps = { mini: false, miniCart: false, hideModal: () => {} };
