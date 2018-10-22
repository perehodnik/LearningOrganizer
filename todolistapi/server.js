var express = require('express'),
    app = express(),
    port = 8081,
    IP = "127.0.0.1";
    mongoose = require('mongoose'),
    Todo = require('./api/models/todoListModels'), 
    bodyParser = require('body-parser');
  
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/learning_organizer'); 


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./api/routes/todoListRoutes');
routes(app); 


app.listen(port, IP);


console.log('todo list RESTful API server started on: ' + port);