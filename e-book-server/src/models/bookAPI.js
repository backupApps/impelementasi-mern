const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookAPI = new Schema(
   {
      title: {
         type: String,
         required: true,
      },
      body: {
         type: String,
         required: true,
      },
      publisher: {
         type: String,
         required: true,
      },
      author: {
         type: String,
         required: true,
      },
      image: {
         type: String,
         required: true,
      },
      date: {
         type: String,
         required: true,
      },
      stock: {
         type: Number,
         required: true,
      },
   },
   { timestamps: true }
);

module.exports = mongoose.model("BookAPI", BookAPI, "book");
