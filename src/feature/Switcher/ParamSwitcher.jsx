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

const SmallTextListItem = css`
  min-width: 24px;
  height: 24px;
  line-height: 24px;
  font-size: 14px;
  padding: 0 3px;
`;

const BigTextListItem = css`
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
  ${(props) => (props.mini ? `${SmallTextListItem}` : `${BigTextListItem}`)};
  color: ${(props) => props.active && 'white'};
  &:hover {
    color: white;
    background: ${(props) => props.theme.primary};
    border-color: ${(props) => props.theme.primary};
  }
  &:before {
    content: '${(props) => props.value}';
  }
`;

const SmallColorListItem = css`
  width: 16px;
  height: 16px;
`;

const BigColorListItem = css`
  width: 32px;
  height: 32px;
`;

const ColorItem = styled.li`
  cursor: pointer;
  background: ${(props) => props.value};
  ${(props) => (props.mini ? `${SmallColorListItem}` : `${BigColorListItem}`)};
  outline: ${(props) => props.active && `2px solid ${props.theme.primary}`};
  outline-offset: 1px;
  &:hover {
    color: white;
    outline: 2px solid ${(props) => props.theme.primary};
  }
`;

export class ParamSwitcher extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currentOption: this.props.options[0] };
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
    const { mini, options, header, attrType } = this.props;
    return (
      <ThemeProvider theme={theme}>
        <ParamListContainer>
          <ParamHeader>{header}</ParamHeader>
          <ParamList mini={mini}>
            {options.map(
              // eslint-disable-next-line
              (option) =>
                attrType === 'text' ? (
                  <ListItem
                    mini={mini}
                    value={option.value}
                    onClick={this.onOptionClicked(option)}
                    active={this.state.currentOption.id === option.id}
                    key={option.id}
                  />
                ) : (
                  <ColorItem
                    mini={mini}
                    value={option.value}
                    onClick={this.onOptionClicked(option)}
                    active={this.state.currentOption.id === option.id}
                    key={option.id}
                  />
                )
              // eslint-disable-next-line
            )}
          </ParamList>
        </ParamListContainer>
      </ThemeProvider>
    );
  }
}

ParamSwitcher.propTypes = {
  mini: PropTypes.bool,
  options: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
  attrType: PropTypes.string.isRequired,
  header: PropTypes.string.isRequired
};

ParamSwitcher.defaultProps = { mini: false };
