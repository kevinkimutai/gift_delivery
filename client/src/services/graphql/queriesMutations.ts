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

export const GETUSER = gql`
  query getUserById($id: ID!) {
    user(id: $id) {
      fullname
      role
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

export const ADD_USER = gql`
  mutation addNewUser($fullname: String!, $email: String!, $password: String!) {
    addUser(fullname: $fullname, email: $email, password: $password) {
      id
    }
  }
`;

export const LOGIN_USER = gql`
  mutation loginToAcc($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;
