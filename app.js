const express = require("express");
// brings in express generator
const logger = require("morgan");
// brings in morgan middleware

const app = express();
//initialize express with the variable app.

const userRouter = require("./routes/user/userRouter");
// folder where we bring in userRouter. userRouter allows us to create paths for CRUD. 

app.use(logger("dev"));
// sets up a developer enviroment.

app.use(express.json());
//parsing form data/incoming data
app.use(express.urlencoded({ extended: false }));

app.use("/api/user", userRouter);
// the path in which we allow the user to access the userRouter file and its associated CRUD.
module.exports = app;
//allows the system to use app globally.
