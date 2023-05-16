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

export const GETALLCATEGORIES = gql`
  query {
    categories {
      id
      name
    }
  }
`;

export const GETGIFTSBYCATEGORY = gql`
  query getGiftByCategory($id: ID!) {
    giftsByCategory(id: $id) {
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
      category {
        id
        name
      }
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
    $description: GiftDescriptionInput!
    $price: Int!
    $category: String!
    $image: String!
    $countInStock: Int!
    $numOrders: Int
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
