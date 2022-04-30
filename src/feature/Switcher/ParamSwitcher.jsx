import React from 'react';
import PropTypes from 'prop-types';
import styled, { css, ThemeProvider } from 'styled-components';

const theme = { primary: '#5ece7b' };

const ParamListContainer = styled.div`
  margin-bottom: 16px;
`;

const ParamHeader = styled.p`
  height: 18px;
  font-family: Roboto Condensed;
  font-weight: 700;
  font-size: 18px;
  line-height: 18px;
`;

const ParamList = styled.ul`
  margin-top: 8px;
  display: flex;
  flex-wrap: wrap;
  gap: ${(props) => (props.mini ? '8px' : '12px')}; ;
`;

const SmallListItem = css`
  min-width: 24px;
  height: 24px;
  line-height: 24px;
  font-size: 14px;
  padding: 0 3px;
`;

const BigListItem = css`
  min-width: 63px;
  height: 45px;
  line-height: 45px;
  font-size: 18px;
  padding: 0 10px;
`;

const ListItem = styled.li`
  cursor: pointer;
  font-family: Source Sans Pro;
  font-weight: 400;
  text-align: center;
  list-style: none;
  box-sizing: border-box;
  border: 1px solid black;
  background: ${(props) => props.active && 'black'};
  ${(props) => (props.mini ? `${SmallListItem}` : `${BigListItem}`)};
  color: ${(props) => props.active && 'white'};
  &:hover {
    color: white;
    background: ${(props) => props.theme.primary};
    border-color: ${(props) => props.theme.primary};
  }
`;

export class ParamSwitcher extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currentOption: null };
    this.handleChange = this.handleChange.bind(this);
    this.onOptionClicked = this.onOptionClicked.bind(this);
  }

  handleChange(event) {
    console.log(this.state);
    this.setState({ currentOption: event.target.value });
  }

  onOptionClicked(value) {
    return () => {
      this.setState({ currentOption: value });
      console.log(value);
    };
  }

  render() {
    const { mini, options, header } = this.props;
    return (
      <ThemeProvider theme={theme}>
        <ParamListContainer>
          <ParamHeader>{header}</ParamHeader>
          <ParamList mini={mini}>
            {options.map((option) => (
              <ListItem mini={mini} onClick={this.onOptionClicked(option)} active={this.state.currentOption === option} key={Math.random()}>
                {option}
              </ListItem>
            ))}
          </ParamList>
        </ParamListContainer>
      </ThemeProvider>
    );
  }
}

ParamSwitcher.propTypes = {
  mini: PropTypes.bool,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  header: PropTypes.string.isRequired
};

ParamSwitcher.defaultProps = { mini: false };
