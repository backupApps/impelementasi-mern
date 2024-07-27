const express = require("express");
const mongoose = require("mongoose");

const bookRoutes = require("./src/routes/bookAPI");

const app = express();
const port = 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
