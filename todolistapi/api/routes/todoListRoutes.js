'use strict';
var mongoose = require('mongoose'),
      Todo = mongoose.model('Todo');

module.exports = function(app) {
  var todoList = require('../controllers/todoListController');


  // todoList Routes
  app.route('/todolists')
    .get(todoList.list_all_todolists)
    .post(todoList.create_a_todolist);


  app.route('/todolists/:todoListId')
    .get(todoList.read_a_todolist)
    .delete(todoList.delete_a_todolist)
    .post(todoList.create_a_todo);

  // todo Routes
  app.route('/todolists/:todoListId/:todoId')
    .delete(todoList.delete_a_todo);


};

