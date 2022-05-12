import React from 'react';
import PropTypes from 'prop-types';
import styled, { css, ThemeProvider } from 'styled-components';

const theme = { primary: '#5ece7b' };

const ParamListContainer = styled.div``;

const ParamHeader = styled.p`
  margin: 0;
  height: 18px;
  font-family: Roboto Condensed;
  font-weight: 700;
  font-size: 18px;
  line-height: 18px;
`;

const ParamList = styled.ul`
  list-style-type: none;
  padding: 0;
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
  filter: drop-shadow(0px 4px 11px rgba(29, 31, 34, 0.2));
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

  componentDidMount() {
    this.props.addParentState({ [this.props.header.toLowerCase()]: this.state.currentOption });
    if (Object.keys(this.props.selectedOption).length !== 0) {
      this.setState({ currentOption: this.props.selectedOption });
    }
    console.log('OPTIONS', this.props.options[0], this.props.selectedOption);
  }

  handleChange(event) {
    console.log(this.state);
    this.setState({ currentOption: event.target.value });
  }

  onOptionClicked(value) {
    return () => {
      this.props.addParentState({ [this.props.header.toLowerCase()]: value });
      this.setState({ currentOption: value });
      console.log(value);
    };
  }

  render() {
    const { mini, options, header, attrType } = this.props;
    return (
      <ThemeProvider theme={theme}>
        <ParamListContainer>
          <ParamHeader>{`${header.toUpperCase()}:`}</ParamHeader>
          <ParamList mini={mini}>
            {options.map(
              // eslint-disable-next-line
              (option) =>
                attrType === 'text' ? (
                  <ListItem
                    mini={mini}
                    value={option.value}
                    onClick={this.onOptionClicked(option, header)}
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
  header: PropTypes.string.isRequired,
  addParentState: PropTypes.func,
  selectedOption: PropTypes.objectOf(PropTypes.string)
};

ParamSwitcher.defaultProps = { mini: false, addParentState: () => {}, selectedOption: {} };
