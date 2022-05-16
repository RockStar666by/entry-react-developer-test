import React from 'react';
import { connect } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import PropTypes from 'prop-types';
import { setCurrency } from '../../../redux/actions';
import { CURRENCIES } from '../../../queries/getCurrencies';
import { client } from '../../../apollo/apollo';
import * as Styles from './styles';

const theme = { primary: '#5ece7b' };

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
        <Styles.DropDownContainer ref={this.wrapperRef}>
          <Styles.DropDownHeader onClick={this.handleToggling}>
            {currencies.length > 0 && <span>{currencies[currency.index].symbol}</span>}
            {isOpen ? <Styles.Arrow /> : <Styles.Arrow rotate="true" />}
          </Styles.DropDownHeader>
          {isOpen && (
            <Styles.DropDownListContainer>
              <Styles.DropDownList>
                {/* eslint-disable-next-line */}
                {currencies.map((currency, index) => {
                  console.log(index, currency);
                  return (
                    <Styles.ListItem onClick={this.onOptionClicked({ ...currency, index })} key={currency.label}>
                      {`${currency.symbol} ${currency.label}`}
                      {index === this.props.currency.index && <Styles.Checked />}
                    </Styles.ListItem>
                  );
                })}
              </Styles.DropDownList>
            </Styles.DropDownListContainer>
          )}
        </Styles.DropDownContainer>
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
