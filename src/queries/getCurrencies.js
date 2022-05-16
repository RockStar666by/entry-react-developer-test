import { gql } from '@apollo/client';

export const CURRENCIES = gql`
  query getCurrencies {
    currencies {
      label
      symbol
    }
  }
`;
