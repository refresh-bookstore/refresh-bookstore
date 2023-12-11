const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    publisher: {
      type: String,
      required: true,
    },
    publication_date: {
      type: Date,
      required: true,
    },
    isbn: {
      type: String,
      required: true,
      index: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image_path: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      requried: true,
      ref: "Category",
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
