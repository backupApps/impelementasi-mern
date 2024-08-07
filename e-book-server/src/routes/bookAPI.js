const express = require("express");
const { body } = require("express-validator");

const router = express.Router();
const bookControllers = require("../controllers/bookAPI");

// endpoint -> [POST] : /book/insert
router.post(
   "/insert",
   [
      body("title")
         .isLength({ min: 5 })
         .withMessage("Panjang Title minimal 5 karakter!"),
      body("body")
         .isLength({ min: 5 })
         .withMessage("Panjang Body minimal 5 karakter!"),
   ],
   bookControllers.insertBookAPI
);

// endpoint -> [GET] : /book/showbook
router.get("/showbooks", bookControllers.showBooksAPI);

// endpoint -> [GET] : /book/showdetailsbook
router.get("/showdetailsbook/:id", bookControllers.showDetailsBook);

// endpoint -> [PUT] : /book/update
router.put(
   "/update/:id",
   [
      body("title")
         .isLength({ min: 5 })
         .withMessage("Panjang Title minimal 5 karakter!"),
      body("body")
         .isLength({ min: 5 })
         .withMessage("Panjang Body minimal 5 karakter!"),
   ],
   bookControllers.updateBookAPI
);

// endpoint -> [DELETE] /book/showdetailsbook/:id
router.delete("/showdetailsbook/:id", bookControllers.deleteBookAPI);

module.exports = router;
