const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer"); // multipart/form-data (unggah file)
const path = require("path");

const bookRoutes = require("./src/routes/bookAPI");

const app = express();
const port = 4000;

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

// cors
const corsOption = {
   origin: "http://localhost:3000",
   methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
   allowedHeaders: ["Content-Type", "Authorization"],
};

// middleware
app.use(cors(corsOption));
app.use(express.json()); // parsing json
app.use(express.urlencoded({ extended: true }));
app.use("/images", express.static(path.join(__dirname, "images")));
app.use(multer({ storage: storage, filter: filter }).single("image"));

app.use((req, res, next) => {
   console.log(`Incoming request: ${req.method} ${req.url} `);
   next();
});

// endpoint
app.use("/book", bookRoutes);

// connect mongodb
mongoose
   .connect("mongodb://localhost:27017/agoengbani", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
   })
   .then(
      app.listen(port, () => {
         console.log(`Server is running on http://localhost:${port}`);
      })
   )
   .catch((err) => {
      console.log(err);
   });
