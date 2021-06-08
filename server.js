require("dotenv").config();
// inits env file.

const mongoose = require("mongoose");

const app = require("./app");

const port = 3000;

mongoose
  .connect(process.env.MONGO_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`Server connected on ${port}`);
      console.log("MongoDB Connected");
    });
  })
  .catch((e) => {
    console.log(e);
  });
// process.env.mongo_db allows us to utilize a env for our jwt. 
// this hw is missing the env file so i cant go to much in depth.