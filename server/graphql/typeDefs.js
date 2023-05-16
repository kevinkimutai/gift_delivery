import { gql } from "graphql-tag";

const typeDefs = gql`
  type Gift {
    id: ID
    name: String
    description: GiftDescription
    price: Int
    category: Category
    image: String
    numOrders: String
    countInStock: Int
  }

  type GiftDescription {
    text: String
    features: [String]
  }
  input GiftDescriptionInput {
    text: String
    features: [String]
  }

  type Category {
    id: ID
    name: String
    gifts: [Gift]
  }

  type Query {
    gift(id: ID): Gift
    category(id: ID): Category
    gifts: [Gift]
    categories: [Category]
  }

  type Mutation {
    addGift(
      name: String!
      description: GiftDescriptionInput!
      price: Int!
      category: String!
      image: String!
      numOrders: Int
      countInStock: Int!
    ): Gift
    addCategory(name: String!): Category
  }
`;

export default typeDefs;
