'use strict';
module.exports = function(app) {
  var todoList = require('../controllers/todoListController');

  // todoList Routes
  app.route('/todos')
    .get(todoList.list_all_todos)
    .post(todoList.create_a_todo);


  app.route('/todos/:todoId')
    .get(todoList.read_a_todo)
    .put(todoList.update_a_todo)
    .delete(todoList.delete_a_todo);
};