const express = require("express");

const router = express.Router();

const bookControllers = require("../controllers/bookAPI");

// endpoint -> [POST] : /book/insert
router.post("/insert", bookControllers.insertBookAPI);

// endpoint -> [GET] : /book/showbook
router.get("/showbooks", bookControllers.showBooksAPI);

// endpoint -> [GET] : /book/showdetailsbook
router.get("/showdetailsbook/:id", bookControllers.showDetailsBook);

//

module.exports = router;
