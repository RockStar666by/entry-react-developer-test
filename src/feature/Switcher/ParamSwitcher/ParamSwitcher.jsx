import React from 'react';
import { bool, arrayOf, objectOf, string, func } from 'prop-types';
import { ThemeProvider } from 'styled-components';
import * as Styles from './styles';

const theme = { primary: '#5ece7b' };

export class ParamSwitcher extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currentOption: this.props.options[0] };
    this.handleChange = this.handleChange.bind(this);
    this.onOptionClicked = this.onOptionClicked.bind(this);
  }

  componentDidMount() {
    this.props.addParentState({ [this.props.header.toLowerCase()]: this.state.currentOption });
    if (Object.keys(this.props.selectedOption).length !== 0) {
      this.setState({ currentOption: this.props.selectedOption });
    }
  }

  handleChange(event) {
    this.setState({ currentOption: event.target.value });
  }

  onOptionClicked(value) {
    return () => {
      this.props.addParentState({ [this.props.header.toLowerCase()]: value });
      this.setState({ currentOption: value });
    };
  }

  render() {
    const { mini, options, header, attrType, miniCart } = this.props;
    return (
      <ThemeProvider theme={theme}>
        <Styles.ParamListContainer>
          <Styles.ParamHeader miniCart={miniCart}>{`${header}:`}</Styles.ParamHeader>
          <Styles.ParamList mini={mini} miniCart={miniCart}>
            {options.map((option) =>
              attrType === 'text' ? (
                <Styles.ListItem
                  mini={mini}
                  value={option.value}
                  onClick={this.onOptionClicked(option, header)}
                  active={this.state.currentOption.id === option.id}
                  key={option.id}
                />
              ) : (
                <Styles.ColorItem
                  mini={mini}
                  value={option.value}
                  onClick={this.onOptionClicked(option)}
                  active={this.state.currentOption.id === option.id}
                  key={option.id}
                />
              )
            )}
          </Styles.ParamList>
        </Styles.ParamListContainer>
      </ThemeProvider>
    );
  }
}

ParamSwitcher.propTypes = {
  mini: bool,
  miniCart: bool,
  options: arrayOf(objectOf(string)).isRequired,
  attrType: string.isRequired,
  header: string.isRequired,
  addParentState: func,
  selectedOption: objectOf(string)
};

ParamSwitcher.defaultProps = { mini: false, miniCart: false, addParentState: () => {}, selectedOption: {} };
