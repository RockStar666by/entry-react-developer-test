import { gql } from '@apollo/client';

export const CATEGORIES = gql`
  query getCategories {
    categories {
      name
    }
  }
`;
