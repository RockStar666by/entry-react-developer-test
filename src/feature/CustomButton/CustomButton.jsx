import React from 'react';
import { string, bool, func } from 'prop-types';
import { ThemeProvider } from 'styled-components';
import * as Styles from './styles';

const theme = { primary: '#5ece7b' };
export class CustomButton extends React.Component {
  render() {
    const { children, small, filled, actionOnClick, wide } = this.props;
    return (
      <ThemeProvider theme={theme}>
        <Styles.ButtonContainer small={small} filled={filled} wide={wide} onClick={actionOnClick}>
          {children}
        </Styles.ButtonContainer>
      </ThemeProvider>
    );
  }
}

CustomButton.propTypes = {
  children: string,
  small: bool,
  filled: bool,
  wide: bool,
  actionOnClick: func
};

CustomButton.defaultProps = {
  children: 'BUTTON',
  small: false,
  filled: false,
  wide: false,
  actionOnClick: () => console.log('button clicked!!!')
};
