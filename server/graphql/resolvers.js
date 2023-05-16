const resolvers = {
  Query: {
    gift: async (parent, args, { dataSources }, info) => {
      console.log("Fetching gift with id:", args.id);
      return await dataSources.giftDB.getGift(args.id);
    },
    category: async (parent, args, { dataSources }, info) => {
      console.log("Fetching gifts category with id:", args.id);
      return await dataSources.giftDB.getCategory(args.id);
    },

    gifts: async (parent, args, { dataSources }, info) => {
      console.log("Fetching All Gifts");
      const books = await dataSources.giftDB.getAllGifts();
      return books;
    },
    categories: async (parent, args, { dataSources }, info) => {
      console.log("Fetching all categories");
      return await dataSources.giftDB.getAllCategories();
    },
    giftsByCategory: async (parent, args, { dataSources }, info) => {
      const gifts = await dataSources.giftDB.getGiftsByCategory(args.id);
      return gifts;
    },
  },
  Mutation: {
    addCategory: async (parent, args, { dataSources }, info) => {
      const category = await dataSources.giftDB.createCategory(args.name);
      return category;
    },

    addGift: async (parent, args, { dataSources }, info) => {
      console.log(args);
      const gift = await dataSources.giftDB.createGift(
        args.name,
        {
          text: args.description.text,
          features: args.description.features,
        },
        args.price,
        args.category,
        args.image,
        args.countInStock,
        args.numOrders
      );
      console.log("Adding new Gift");
      return gift;
    },
  },
  Category: {
    gifts: async (parent, args, { dataSources }, info) => {
      console.log("searching", parent);
      return await dataSources.giftDB.getGiftsByCategory(parent.id);
    },
  },
  Gift: {
    category: async (parent, args, { dataSources }, info) => {
      return await dataSources.giftDB.getCategory(parent.category);
    },
  },
};

export default resolvers;
