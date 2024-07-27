const BookApi = require("../models/bookAPI");

// post
exports.insertBookAPI = (req, res, next) => {
   // request user
   const { title, body, author, publisher, publication_year, stock } = req.body;

   const Submit = new BookApi({
      title,
      body,
      author,
      publisher,
      publication_year,
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
exports.showBookAPI = (req, res, next) => {
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
