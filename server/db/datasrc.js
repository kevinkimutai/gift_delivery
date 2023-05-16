import mongoose from "mongoose";
import Gift from "../model/gift.js";
import Category from "../model/category.js";

export class DBDataSource {
  constructor(options) {
    this.token = options.token;
    this.dbConnection = DBDataSource.initializeDBConnection();
  }

  static async initializeDBConnection() {
    const connection = await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected!");

    return connection;
  }

  async getUser() {
    if (!this.user) {
      // store the user, lookup by token
      this.user = await this.dbConnection
        .collection("user")
        .findByToken(this.token);
    }
    return this.user;
  }

  async getGift(giftId) {
    const gift = await Gift.findById(giftId);
    return gift;
  }

  async getCategory(authorId) {
    const category = await Category.findById(authorId);
    return category;
  }

  async getAllGifts() {
    const gifts = await Gift.find({});

    return gifts;
  }

  async getAllCategories() {
    const categories = await Category.find({});
    return categories;
  }

  async createCategory(name, age) {
    const category = new Category({
      name,
    });
    return category.save();
  }

  async createGift(
    name,
    desc,
    price,
    category,
    image,
    countInStock,
    numOrders
  ) {
    const gift = new Gift({
      name,
      description: {
        text: desc.text,
        features: desc.features,
      },
      price,
      category,
      image,
      countInStock,
      numOrders,
    });
    return gift.save();
  }

  async getGiftsByCategory(category) {
    const gifts = await Gift.find({ category: category.id });
    return gifts;
  }
}
