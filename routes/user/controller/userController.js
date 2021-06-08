const bcrypt = require("bcryptjs");
// allows us to encrypt our data.
const User = require("../model/User");
// brings in the schema
const jwt = require("jsonwebtoken");
// JWT is a 3 piece string of code 

async function signup(req, res) {
  const { username, email, password, firstName, lastName } = req.body;
  // assigning variables to keys in req.body

  const { errorObj } = res.locals;

  if (Object.keys(errorObj).length > 0) {
    return res.status(500).json({ message: "failure", payload: errorObj });
  } // finds error msg in our function.

  try {
    let salt = await bcrypt.genSalt(12);
    let hashedPassword = await bcrypt.hash(password, salt);
// these two above encrypt our passwords. the word await stop the system 
//from going forward and once await is done, then it keeps goin down line by line.
    const createdUser = new User({
      firstName,
      lastName,
      email,
      username,
      password: hashedPassword,
    });
    // the keys from the schema. the hashedpassword above hashes our input password

    let savedUser = await createdUser.save();
    // the user is saved to our server. once its done its goes to the next line.

    res.json({ message: "success", data: savedUser });
  } catch (e) {
    console.log(e);
    console.log(e.message);
    res.json({ message: "error", error: e });
  } // catches a error if any within the sign up process.
}

async function login(req, res) {
  const { email, password } = req.body;

  const { errorObj } = res.locals;

  if (Object.keys(errorObj).length > 0) {
    return res.status(500).json({ message: "failure", payload: errorObj });
  } // if theres even 1 err, it will say what it is.

  try {
    let foundUser = await User.findOne({ email: email });
    // finds our user that we are looking for based on our email

    if (!foundUser) {
      res.status(400).json({
        message: "failure",
        payload: "Please check your email and password",
      });
      // if no user is found throws err.
    } else {
      //password = 1, foundUser.password = $2a$12$tauL3AEb5gvKdcQdDKNWLeIYv422jNq2aRsaNWF5J4TdcWEdhq4CO
      let comparedPassword = await bcrypt.compare(password, foundUser.password);
      // if user is found, it will compare our hashed password and the password we put in.

      if (!comparedPassword) {
        res.status(400).json({
          message: "failure",
          payload: "Please check your email and password",
        });
        // if password doesnt match, throw err.
      } else {  
        let jwtToken = jwt.sign(
          {
            email: foundUser.email,
            username: foundUser.username,
          },
          process.env.PRIVATE_JWT_KEY,
          {
            expiresIn: "1d",
          }
        );
          // upon successful sign in, we receive a temp jwt key that lasts "1d". this will ensure that we 
          // have to relog and not have to keep using our password everytime we click a new page.
        res.json({ message: "success", payload: jwtToken });
      }
    }
  } catch (e) {
    res.json({ message: "error", error: e });
  }
}

module.exports = { signup, login };
