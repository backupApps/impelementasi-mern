const { validationResult } = require("express-validator");
const path = require("path");
const fs = require("fs"); // file system for delete
const BookApi = require("../models/bookAPI");

//TODO CREATE
exports.insertBookAPI = (req, res, next) => {
   const errors = validationResult(req);

   if (!errors.isEmpty()) {
      const err = new Error("Input value tidak sesuai"); // error.message
      err.errorStatus = 400; // error.status
      err.data = errors.array(); //error.data
      throw err;
   }
   if (!req.file) {
      return res.status(422).json({
         message: "No image provided",
      });
   }

   // request user
   const { title, body, author, publisher, date, stock } = req.body;
   const image = req.file.path;

   const Submit = new BookApi({
      title: title,
      image: image,
      body: body,
      author: author,
      publisher: publisher,
      date: date,
      stock: stock,
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
         res.status(500).json({
            message: "Failed to insert book",
            error: err,
         });
      });
};

//TODO READ
exports.showBooksAPI = (req, res, next) => {
   // fetch by db
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

//TODO READ by Id
exports.showDetailsBook = (req, res, next) => {
   const bookId = req.params.id;

   BookApi.findById(bookId)
      .then((book) => {
         if (!book) {
            const error = new Error("Book not found");
            error.statusCode = 404;
            throw error;
         }
         res.status(200).json({ message: "Book details fetched", data: book });
      })
      .catch((err) => {
         next(err);
      });
};

//TODO UPDATE
exports.updateBookAPI = (req, res, next) => {
   const errors = validationResult(req);

   if (!errors.isEmpty()) {
      const err = new Error("Input value tidak sesuai"); // error.message
      err.errorStatus = 400; // error.status
      err.data = errors.array(); //error.data
      throw err;
   }
   if (!req.file) {
      return res.status(422).json({
         message: "No image provided",
      });
   }

   const { title, body, author, publisher, date, stock, existingImage } =
      req.body;
   const image = req.file ? req.file.path : existingImage; // gunakan gambar baru jika ada, jika tidak gunakan existingImage
   const bookId = req.params.id;

   BookApi.findById(bookId)
      .then((book) => {
         if (!book) {
            const error = alert("Book not found");
            error.errorStatus = 404;
            throw error;
         }

         // If there is a new image, delete the old one
         if (req.file) {
            const oldImagePath = path.join(__dirname, "../../", book.image);
            fs.unlink(oldImagePath, (err) => {
               if (err) console.log(err);
            });
            book.image = req.file.path;
         }

         book.title = title;
         book.body = body;
         book.author = author;
         book.publisher = publisher;
         book.date = date;
         book.stock = stock;
         book.image = image;

         return book.save();
      })
      .then((result) => {
         res.status(200).json({
            message: "Update Success",
            data: result,
         });
      })
      .catch((err) => {
         next(err);
      });
};

//TODO DELETE
exports.deleteBookAPI = (req, res, next) => {
   const bookId = req.params.id;

   BookApi.findById(bookId)
      .then((book) => {
         if (!book) {
            const err = new Error("Book not found!");
            err.errorStatus = 404;
            throw err;
         }

         removeImage(book.image); // hapus image
         return BookApi.findByIdAndDelete(bookId); // hapus postingan
      })
      .then((result) => {
         res.status(200).json({
            message: "Hapus Blog Post Berhasil!",
            data: result,
         });
      })
      .catch((err) => {
         next(err);
      });
};

const removeImage = (filePath) => {
   console.log("filePath ", filePath);
   console.log("directory name: ", __dirname);

   if (!filePath) return;

   // /home/keycaps/Code/belajar-MERN/mern-api/images/<nama_image>.jpg
   filePath = path.join(__dirname, "../../", filePath);
   fs.unlink(filePath, (err) => console.log(err)); // delete image
};
