const { validation } = require("express-validator");
const path = require("path");
const fs = require("fs"); // file system for delete
const BookApi = require("../models/bookAPI");

// post
exports.insertBookAPI = (req, res, next) => {
   // request user
   const { title, body, author, publisher, date, stock } = req.body;
   const image = req.file.path;

   const Submit = new BookApi({
      title,
      image,
      body,
      author,
      publisher,
      date,
      stock,
   });

   // save to db
   Submit.save()
      .then((result) => {
         // response
         res.status(201).json({
            message: "Insert Book Success",
            data: result,
         });
      })
      .catch((err) => {
         console.log("Error: ", err);
      });
};

// get
exports.showBooksAPI = (req, res, next) => {
   BookApi.find()
      .countDocuments()
      .then((count) => {
         totalData = count;
         return BookApi.find();
      })
      .then((result) => {
         res.status(200).json({
            message: "Success called API",
            data: result,
            total_data: totalData,
         });
      })
      .catch((err) => {
         next(err);
      });
};

exports.showDetailsBook = (req, res, next) => {
   const bookId = req.params.id;

   BookApi.findById(bookId)
      .then((book) => {
         if (!book) {
            const error = new Error("Book not found");
            error.statusCode = 404;
            throw error;
         }
         res.status(200).json({ message: "Book details fetched", book });
      })
      .catch((err) => {
         err.statusCode = 500;
      });
   next();
};

// delete
exports.deleteBookAPI = (req, res, next) => {};
