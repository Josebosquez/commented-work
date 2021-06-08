const mongoose = require("mongoose");
// accessing mongoose for promises and callbacks.

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  username: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
});

module.exports = mongoose.model("user", userSchema);

// This page is the form on the browser that the user sees.
// This gets saved to the database when they fill it out.
// You can configure your keys to be in the form of numbers, 
// strings, booleans, and have special traits like unique, lower
// or uppercase.