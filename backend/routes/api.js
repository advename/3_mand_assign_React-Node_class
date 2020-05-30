const express = require("express");
const app = express();

// Require router files
const usersRoutes = require(__dirname + "/./api/users");
const postsRoutes = require(__dirname + "/./api/posts");

// Include the routes to express
app.use("/users", usersRoutes);
app.use("/posts", postsRoutes);

// Export the file to be used in server.js
module.exports = app;
