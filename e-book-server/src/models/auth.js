const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

const Auth = new Schema({
   name: {
      type: String,
      required: true,
   },
   username: {
      type: String,
      required: true,
      unique: true,
   },
   email: {
      type: String,
      required: true,
      unique: true,
   },
   password: {
      type: String,
      required: true,
   },
   image: {
      type: String,
   }
});

// Hash password
Auth.pre("save", async function (next) {
   if (!this.isModified("password")) {
      return next();
   }
   const salt = await bcrypt.genSalt(10);
   this.password = await bcrypt.hash(this.password, salt);
   next();
});

Auth.methods.matchPassword = async function (enteredPassword) {
   return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("Auth", Auth, "auth");
