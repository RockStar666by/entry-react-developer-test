import React from 'react';
import { Navigation } from '../Navigation/Navigation';
import { CurrencySwitcher } from '../../feature/Switcher/CurrencySwitcher/CurrencySwitcher';
import { CartButton } from '../Cart/CartButton/CartButton';
import * as Styles from './styles';

export class Header extends React.Component {
  render() {
    return (
      <Styles.HeaderWrapper className="header-wrapper">
        <Navigation />
        <Styles.Logo />
        <Styles.Actions>
          <CurrencySwitcher />
          <CartButton />
        </Styles.Actions>
      </Styles.HeaderWrapper>
    );
  }
}
