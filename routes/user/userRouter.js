const express = require("express");
// brings in express generator
const router = express.Router();
// router variable allows for us to make CRUD requests based off of express 
//generator.

const { signup, login } = require("./controller/userController");
// these two variables are functions that have been exported from userController.

const checkIsUndefined = require("./helpers/checkIsUndefined");
const checkIsEmptyFunc = require("./helpers/checkIsEmptyFunc");
const checkIsStrongPasswordFunc = require("./helpers/checkIsStrongPasswordFunc");
// these variables above are functions that have been created to show the user that

const {
  checkIsEmailFunc,
  checkIsAlphaFunc,
  checkIsAlphanumericFunc,
} = require("./helpers/authMiddleware");
// the same as above but in one consolidated page.
// you can consolidate them or let them have their own files for easier debugging.

router.post(
  "/sign-up", // path for our post request
  checkIsUndefined,
  checkIsEmptyFunc,
  checkIsStrongPasswordFunc,
  checkIsEmailFunc,
  checkIsAlphaFunc,
  checkIsAlphanumericFunc,
  signup
);
// This post req goes through the listed functions one by one as they all have the next () function at the end of them. Once they all run, the user gets signed up.

router.post(
  "/login",
  checkIsUndefined,
  checkIsEmptyFunc,
  checkIsEmailFunc,
  login
);
//Once they all run, the user gets logged in. The function can be reused over and over depending on what you do with them. We dont need all of them to log in because its pointless.

module.exports = router;
