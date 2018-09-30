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

module.exports = mongoose.model('Todo', TodoSchema);

//change2