import React from 'react';
import PropTypes from 'prop-types';
import styled, { css, ThemeProvider } from 'styled-components';

const theme = { primary: '#5ece7b' };

const BigButton = css`
  width: 292px;
  height: 52px;
  line-height: 45px;
  font-size: 18px;
  padding: 0 22px;
`;

const SmallButton = css`
  width: 140px;
  height: 45px;
  line-height: 45px;
  font-size: 18px;
  padding: 0 22px;
`;

const ButtonContainer = styled.button`
  cursor: pointer;
  font-weight: 400;
  font-family: inherit;
  text-align: center;
  border: none;
  color: white;
  ${(props) => (props.small ? `${SmallButton}` : `${BigButton}`)};
  width: ${(props) => props.wide && '100%'};
  background: ${(props) => props.theme.primary};
`;

export class CustomButton extends React.Component {
  render() {
    const { children, small, filled, actionOnClick, wide } = this.props;
    return (
      <ThemeProvider theme={theme}>
        <ButtonContainer small={small} filled={filled} wide={wide} onClick={actionOnClick}>
          {children}
        </ButtonContainer>
      </ThemeProvider>
    );
  }
}

CustomButton.propTypes = {
  children: PropTypes.string,
  small: PropTypes.bool,
  filled: PropTypes.bool,
  wide: PropTypes.bool,
  actionOnClick: PropTypes.func
};

CustomButton.defaultProps = {
  children: 'BUTTON',
  small: false,
  filled: false,
  wide: false,
  actionOnClick: () => console.log('button clicked!!!')
};
