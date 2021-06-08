const {
  isEmpty,
  isStrongPassword,
  isEmail,
  isAlpha,
  isAlphanumeric,
} = require("validator");
// brings in the prebuilt methods from validator.npm

const checkIsEmpty = (target) => (isEmpty(target) ? true : false);

const checkIsStrongPassword = (password) =>
  isStrongPassword(password) ? true : false;

const checkIsEmail = (email) => (isEmail(email) ? true : false);

const checkIsAlpha = (target) => (isAlpha(target) ? true : false);

const checkIsAlphanumeric = (target) => (isAlphanumeric(target) ? true : false);

module.exports = {
  checkIsEmpty,
  checkIsStrongPassword,
  checkIsEmail,
  checkIsAlpha,
  checkIsAlphanumeric,
};


//this page allows us to create variables that look for specific string characters
// Ternary was used to shorten the length of code to make it easier to understand.
// once we made specific functions, we export them for further use.