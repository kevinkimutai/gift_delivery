import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "missing name field in Category schema"],
  },
});

const Gift = mongoose.model("Category", categorySchema);

export default Gift;
