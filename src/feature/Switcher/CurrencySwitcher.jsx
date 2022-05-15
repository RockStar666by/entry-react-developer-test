import React from 'react';
import { connect } from 'react-redux';
import styled, { ThemeProvider } from 'styled-components';
import PropTypes from 'prop-types';
import { setCurrency } from '../../redux/actions';
import ArrowImage from '../../assets/dropdown-arrow.svg';
import { CURRENCIES } from './Queries';
import { client } from '../../apollo/apollo';
import CheckedIcon from '../../assets/check-mark.svg';

const theme = { primary: '#5ece7b' };

const DropDownContainer = styled.div`
  margin: 0 auto;
  height: 40px;
  width: 40px;
  font-weight: 500;
  font-size: 18px;
  z-index: 10;
`;

const DropDownHeader = styled.div`
  display: flex;
  margin-right: 10px;
  justify-content: flex-end;
  align-items: center;
  min-width: 30px;
  height: 40px;
  background: #ffffff;
  &:hover {
    color: ${(props) => props.theme.primary};
  }
`;

const Checked = styled.img`
  margin-left: 10px;
  width: 15px;
  height: 15px;
`;

Checked.defaultProps = { src: CheckedIcon };

const DropDownListContainer = styled.div``;

const DropDownList = styled.ul`
  display: flex;
  flex-direction: column;
  width: 94px;
  margin-left: -20px;
  padding-left: 20px;
  background: #ffffff;
  filter: drop-shadow(0px 4px 35px rgba(168, 172, 176, 0.19));
  &:first-child {
    padding-top: 20px;
  }
`;

const ListItem = styled.li`
  height: 30px;
  line-height: 30px;
  list-style: none;
  margin-bottom: 0.8em;
  &:hover {
    color: ${(props) => props.theme.primary};
  }
`;

const Arrow = styled.img`
  margin-left: 10px;
  transition: transform 0.5s;
  transform: ${(props) => (props.rotate ? 'rotate(180deg)' : 'rotate(0deg)')};
`;

Arrow.defaultProps = { src: ArrowImage };

export class CurrencySwitcherTemplate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currencies: [],
      isOpen: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleToggling = this.handleToggling.bind(this);
    this.onOptionClicked = this.onOptionClicked.bind(this);
    this.wrapperRef = React.createRef();
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
    client.query({ query: CURRENCIES }).then((result) => {
      console.log('MOUNT', result.data);
      this.setState({ currencies: result.data.currencies });
    });
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
      this.setState({ isOpen: false });
    }
  }

  handleChange(event) {
    console.log(this.state);
    this.setState({ currentOption: event.target.value });
  }

  handleToggling() {
    this.setState((prevState) => ({ isOpen: !prevState.isOpen }));
  }

  onOptionClicked(value) {
    return () => {
      this.setState({ isOpen: false });
      this.props.setCurrency(value);
      console.log(value);
    };
  }

  render() {
    const { currencies, isOpen } = this.state;
    const { currency } = this.props;
    console.log(currencies, currency);
    return (
      <ThemeProvider theme={theme}>
        <DropDownContainer ref={this.wrapperRef}>
          <DropDownHeader onClick={this.handleToggling}>
            {currencies.length > 0 && <span>{currencies[currency.index].symbol}</span>}
            {isOpen ? <Arrow /> : <Arrow rotate="true" />}
          </DropDownHeader>
          {isOpen && (
            <DropDownListContainer>
              <DropDownList>
                {/* eslint-disable-next-line */}
                {currencies.map((currency, index) => {
                  console.log(index, currency);
                  return (
                    <ListItem onClick={this.onOptionClicked({ ...currency, index })} key={currency.label}>
                      {`${currency.symbol} ${currency.label}`}
                      {index === this.props.currency.index && <Checked />}
                    </ListItem>
                  );
                })}
              </DropDownList>
            </DropDownListContainer>
          )}
        </DropDownContainer>
      </ThemeProvider>
    );
  }
}

function mapState(state) {
  const { currency } = state;
  return { currency };
}

const actionCreators = { setCurrency };

export const CurrencySwitcher = connect(mapState, actionCreators)(CurrencySwitcherTemplate);

CurrencySwitcherTemplate.propTypes = {
  setCurrency: PropTypes.func.isRequired,
  currency: PropTypes.shape({
    index: PropTypes.number,
    label: PropTypes.string,
    symbol: PropTypes.string
  }).isRequired
};
