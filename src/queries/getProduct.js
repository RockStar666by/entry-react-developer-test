import { gql } from '@apollo/client';

export const PRODUCT = gql`
  query GetProduct($product: String!) {
    product(id: $product) {
      id
      name
      inStock
      gallery
      description
      category
      __typename @skip(if: true)
      attributes {
        id
        name
        type
        __typename @skip(if: true)
        items {
          displayValue
          value
          id
          __typename @skip(if: true)
        }
      }
      prices {
        __typename @skip(if: true)
        currency {
          label
          symbol
        }
        amount
      }
      brand
    }
  }
`;
