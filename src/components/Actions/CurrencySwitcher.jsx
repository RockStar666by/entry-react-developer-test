import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import ArrowImage from '../../assets/dropdown-arrow.svg';
import CheckedIcon from '../../assets/check-mark.svg';

const theme = { primary: '#5ece7b' };

const DropDownContainer = styled.div`
  margin: 0 auto;
  height: 40px;
  width: 40px;
  font-weight: 500;
  font-size: 18px;
`;

const DropDownHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 30px;
  height: 40px;
  background: #ffffff;
  &:hover {
    color: ${(props) => props.theme.primary};
  }
`;

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
  transform: ${(props) => (props.rotate ? 'rotate(180deg)' : 'rotate(0deg)')};
`;

Arrow.defaultProps = { src: ArrowImage };

const Checked = styled.img`
  margin-left: 10px;
  width: 15px;
  height: 15px;
`;

Checked.defaultProps = { src: CheckedIcon };

const options = ['$ USD', '€ EUR', '¥ JPY'];

export class CurrencySwitcher extends React.Component {
  constructor(props) {
    super(props);
    this.state = { option: '$ USD', isOpen: false };

    this.handleChange = this.handleChange.bind(this);
    this.handleToggling = this.handleToggling.bind(this);
    this.onOptionClicked = this.onOptionClicked.bind(this);
    this.wrapperRef = React.createRef();
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
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
    this.setState({ option: event.target.value });
  }

  handleToggling() {
    this.setState((prevState) => ({ isOpen: !prevState.isOpen }));
  }

  onOptionClicked(value) {
    return () => {
      this.setState({ option: value });
      this.setState({ isOpen: false });
      console.log(value);
    };
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <DropDownContainer ref={this.wrapperRef}>
          <DropDownHeader onClick={this.handleToggling}>
            <span>{this.state.option.substring(0, 1)}</span>
            {this.state.isOpen ? <Arrow /> : <Arrow rotate="true" />}
          </DropDownHeader>
          {this.state.isOpen && (
            <DropDownListContainer>
              <DropDownList>
                {options.map((option1) => (
                  <ListItem onClick={this.onOptionClicked(option1)} key={Math.random()}>
                    {option1}
                    {this.state.option === option1 && <Checked />}
                  </ListItem>
                ))}
              </DropDownList>
            </DropDownListContainer>
          )}
        </DropDownContainer>
      </ThemeProvider>
    );
  }
}
