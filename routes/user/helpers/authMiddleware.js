const {
  checkIsEmail,
  checkIsAlpha,
  checkIsAlphanumeric,
} = require("../../utils/authMethods");
//bring in validator funcs.

function checkIsEmailFunc(req, res, next) {
  const { errorObj } = res.locals;
  // is saved for use later throughout the request only. Goes away during page refresh.

  if (!checkIsEmail(req.body.email)) {
    errorObj.wrongEmailFormat = "Must be in email format!";
  }

  next();
}

function checkIsAlphaFunc(req, res, next) {
  const { errorObj } = res.locals;
    // is saved for use later throughout the request only.
  const inComingData = req.body;
  // all req.body info is saved under Incoming Data. the Keys you put in are what is used in the loop below.

  for (key in inComingData) {
    if (key === "firstName" || key === "lastName") {
      if (!checkIsAlpha(inComingData[key])) {
        errorObj[`${key}`] = `${key} can only have characters`;
      }
    }
  }

  next();
}

function checkIsAlphanumericFunc(req, res, next) {
  const { errorObj } = res.locals;
  if (!checkIsAlphanumeric(req.body.username)) {
    errorObj.usernameError = "username can only have characters and numbers";
  } 

  next();
}

module.exports = {
  checkIsEmailFunc,
  checkIsAlphaFunc,
  checkIsAlphanumericFunc,
};

// validator email functions check to ensure users input the right characters for the the particular parts of the form. if there is no issue, it moves on towards the next function.