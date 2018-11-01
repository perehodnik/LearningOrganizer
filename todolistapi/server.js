require("dotenv").config();
const   express = require('express');
const   app = express();
const   port = 8081;
const   IP = "127.0.0.1";
const   bodyParser = require('body-parser');
const   errorHandler = require("./api/controllers/error");
const   authRoutes = require("./api/routes/auth");
const   { loginRequired, ensureCorrectUser } = require("./api/middleware/auth");
const   todolistRoutes = require('./api/routes/todoListRoutes');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/auth", authRoutes);

app.use(
    "/users/:id/todolists",
    loginRequired,
    ensureCorrectUser,
    todolistRoutes
  );

app.use(function(req, res, next) {
    let err = new Error("Not Found");
    err.status = 404;
    next(err);
  });
  
app.use(errorHandler);

app.listen(port, IP);


console.log('todo list RESTful API server started on: ' + port);