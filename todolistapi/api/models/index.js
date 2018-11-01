const mongoose = require("mongoose");
mongoose.set("debug", true);
mongoose.Promise = Promise;

mongoose.connect('mongodb://localhost/learning_organizer', {
    keepAlive: true
  }); 

const todolist_models = require("./todoListModels");
const user = require("./user");

module.exports.Todolist = todolist_models.Todolist;
module.exports.Todo = todolist_models.Todo;
module.exports.User = user;