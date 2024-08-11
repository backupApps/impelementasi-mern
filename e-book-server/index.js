const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer"); // multipart/form-data (unggah file)
const path = require("path");
const bodyParser = require("body-parser");
require("dotenv").config();

const bookRoutes = require("./src/routes/bookAPI");
const authRoutes = require("./src/routes/auth");

const app = express();
const port = process.env.PORT || 4000;

// storage file upload (image)
const storage = multer.diskStorage({
   destination: (req, file, callback) => {
      callback(null, "images");
   },
   filename: (req, file, callback) => {
      callback(null, new Date().getTime() + "-" + file.originalname);
   },
});

// filter file upload
const filter = (req, file, callback) => {
   if (
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/png"
   ) {
      callback(null, true);
   } else {
      callback(null, false);
   }
};

// middleware
app.use(bodyParser.json()); // type JSON
// app.use(express.urlencoded({ extended: true }));
app.use("/images", express.static(path.join(__dirname, "images")));
app.use(multer({ storage: storage, filter: filter }).single("image"));

// cors
const corsOption = {
   origin: "http://localhost:3000",
   methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
   allowedHeaders: ["Content-Type", "Authorization"],
};

// middleware
app.use(cors(corsOption));
app.use(express.json()); // parsing json

app.use((req, res, next) => {
   console.log(`Incoming request: ${req.method} ${req.url} `);
   next();
});

// endpoint
app.use("/book", bookRoutes);
app.use("/auth", authRoutes);

app.use((error, req, res, next) => {
   const status = error.errorStatus || 500;
   const message = error.message;
   const data = error.data;
   res.status(status).json({ message: message, data: data });
});

// connect mongodb
mongoose
   .connect(process.env.MONGO_URI)
   .then(
      app.listen(port, () => {
         console.log(`Server is running on http://localhost:${port}`);
      })
   )
   .catch((err) => {
      console.log(err);
   });
