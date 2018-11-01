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
    required: 'Please enter the name of the todolist',
    unique: 'Please do not use a duplicate name for the todolist'
  },
  todoList: [TodoSchema],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});

TodoListSchema.pre("remove", async function(next) {
  try {
    // find a user
    let user = await User.findById(this.user);
    // remove the id of the message from their messages list
    user.todolists.remove(this.id);
    // save that user
    await user.save();
    // return next
    return next();
  } catch (err) {
    return next(err);
  }
});

module.exports.Todolist = mongoose.model('Todolist', TodoListSchema);
module.exports.Todo = mongoose.model('Todo', TodoSchema);

