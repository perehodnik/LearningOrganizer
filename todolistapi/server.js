var express = require('express'),
    app = express(),
    port = 8081,
    IP = "127.0.0.1";
    mongoose = require('mongoose'),
    Todo = require('./api/models/todoListModels'), //created model loading here
    bodyParser = require('body-parser');
  
// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/learning_organizer'); 


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./api/routes/todoListRoutes'); //importing route
routes(app); //register the route


app.listen(port, IP);


console.log('todo list RESTful API server started on: ' + port);