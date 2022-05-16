import { gql } from '@apollo/client';

export const CATEGORY = gql`
  query getCategory($category: String!) {
    category(input: { title: $category }) {
      products {
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
          currency {
            label
            symbol
            __typename @skip(if: true)
          }
          amount
          __typename @skip(if: true)
        }
        brand
      }
    }
  }
`;
