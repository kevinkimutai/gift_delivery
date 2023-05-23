import mongoose from "mongoose";
import Gift from "../model/gift.js";
import Category from "../model/category.js";
import User from "../model/user.js";
import { generateToken } from "../utils/generateToken.js";

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

  async getUser(userId) {
    const user = await User.findById(userId);
    return user;
  }

  async getAllUsers() {
    const users = await User.find({});
    return users;
  }

  async createNewUser(fullname, email, pwd, confirmpwd) {
    const user = new User({
      fullname,
      email,
      password: pwd,
      confirmPassword: confirmpwd,
    });

    return await user.save();
  }

  async loginToAcc(email, pwd) {
    const user = await User.findOne({ email }).select("+password");

    if (!user || !user.comparePasswords(pwd, user.password)) {
      throw new Error(`Wrong email or password`);
    }

    return user;
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
    return await category.save();
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
    return await gift.save();
  }

  async getGiftsByCategory(category) {
    const gifts = await Gift.find({ category });
    return gifts;
  }
}
