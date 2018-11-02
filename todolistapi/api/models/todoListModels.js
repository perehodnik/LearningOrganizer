'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require("./user");


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
    required: 'Please enter the name of the todolist'
  },
  todoList: [TodoSchema],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});

TodoListSchema.pre("remove", async function(next) {
  try {
    let user = await User.findById(this.user);
    user.todolists.remove(this.id);
    await user.save();
    return next();
  } catch (err) {
    return next(err);
  }
});

module.exports.Todolist = mongoose.model('Todolist', TodoListSchema);
module.exports.Todo = mongoose.model('Todo', TodoSchema);

