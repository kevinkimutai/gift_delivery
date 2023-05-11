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

export const GETONEGIFT = gql`
  query getGiftById($id: ID!) {
    gift(id: $id) {
      id
      name
      price
      category
      description {
        text
        features
      }
      image
      countInStock
    }
  }
`;

export const ADD_GIFT = gql`
  mutation addNewGift(
    $name: String!
    $description: ProductDescriptionInput!
    $price: Int!
    $category: String!
    $image: String!
    $numOrders: Int
    $countInStock: Int!
  ) {
    addGift(
      name: $name
      description: $description
      price: $price
      category: $category
      image: $image
      numOrders: $numOrders
      countInStock: $countInStock
    ) {
      name
    }
  }
`;
