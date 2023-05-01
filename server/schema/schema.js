import graphql from "graphql";

import Gift from "../model/gift.js";

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLNull,
  GraphQLInputObjectType,
} = graphql;

/*TODO: ADD referencing to category,numOrders */

const GiftType = new GraphQLObjectType({
  name: "Gift",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: {
      type: new GraphQLObjectType({
        name: "ProductDescription",
        fields: () => ({
          text: { type: GraphQLString },
          features: { type: new GraphQLList(GraphQLString) },
        }),
      }),
    },
    price: {
      type: GraphQLInt,
    },
    category: { type: GraphQLString },
    image: { type: GraphQLString },
    numOrders: { type: GraphQLString },
    countInStock: { type: GraphQLInt },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    gift: {
      type: GiftType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        console.log("Fetching gift with id:", args.id);
        return Gift.findById(args.id);
      },
    },

    gifts: {
      type: new GraphQLList(GiftType),
      resolve(parent, args) {
        console.log("Fetching all gifts");
        return Gift.find({});
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "MutationType",
  fields: () => ({
    addGift: {
      type: GiftType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        description: {
          type: new GraphQLNonNull(
            new GraphQLInputObjectType({
              name: "ProductDescriptionInput",
              fields: () => ({
                text: { type: new GraphQLNonNull(GraphQLString) },
                features: {
                  type: new GraphQLNonNull(new GraphQLList(GraphQLString)),
                },
              }),
            })
          ),
        },
        price: { type: new GraphQLNonNull(GraphQLInt) },
        category: { type: new GraphQLNonNull(GraphQLString) },
        image: { type: new GraphQLNonNull(GraphQLString) },
        numOrders: { type: GraphQLInt },
        countInStock: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve: async (parent, args) => {
        const gift = await Gift.create({
          name: args.name,
          description: {
            text: args.description.text,
            features: args.description.features,
          },
          price: args.price,
          category: args.category,
          image: args.image,
          numOrders: args.numOrders,
          countInStock: args.countInStock,
        });

        return gift;
      },
    },
  }),
});

export default new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
