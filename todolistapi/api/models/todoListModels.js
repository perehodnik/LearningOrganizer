'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var TodoSchema = new Schema({
  name: {
    type: String,
    required: 'Please enter the name of the task'
  },
  created: {
    type: Date,
    default: Date.now
  },
  done: {
    type: Boolean,
    default: false
  }
});

var TodoListSchema = new Schema({
  todoListName: {
    type: String,
    required: 'Please enter the name of the todolist',
    unique: 'Please do not use a duplicate name for the todolist'
  },
  todoList: [TodoSchema]
});

module.exports = mongoose.model('Todo', TodoSchema);
module.exports = mongoose.model('Todolist', TodoListSchema);
