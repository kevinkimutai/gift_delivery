import { gql } from "@apollo/client";

export const GETALLGIFTS = gql`
  query {
    gifts {
      id
      name
      price
      image
    }
  }
`;
