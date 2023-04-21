const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  categoryId: {
    type: Number,
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model("Category", categorySchema);
