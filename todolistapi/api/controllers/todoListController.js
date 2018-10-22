'use strict';


var mongoose = require('mongoose'),
        Todo = mongoose.model('Todo'),
        Todolist = mongoose.model('Todolist');

exports.create_a_todolist = function(req, res){
  var new_todolist = new Todolist({
    todoListName: req.body.todoListName,
    todoList: []
  });
  new_todolist.save(function(err, todo) {
    if (err) {
      res.send(err)};
    res.json(todo);
  });
}

exports.list_all_todolists   = function(req, res){
  Todolist.find({}, function(err, todolist){
    if (err){
      res.send(err)};
    res.json(todolist);
  });
}

exports.read_a_todolist = function(req, res) {
  Todolist.findById(req.params.todoListId, function(err, todolist) {
    if (err) {
      res.send(err)};
    res.json(todolist.todoList);
  });
};

exports.delete_a_todolist = function(req, res) {
  Todolist.remove({
    _id: req.params.todoListId
  }, function(err, todolist) {
    if (err) {
      res.send(err)};
    res.json({ message: 'todolist successfully deleted' });
  });
};

exports.create_a_todo = function(req, res) {
  var new_todo = new Todo(req.body);
  Todolist.findById(req.params.todoListId, function(err, todolist) {
    if (err) {
      res.send(err)};
    var targetList = todolist;
    targetList.todoList.push(new_todo);
    targetList.save(function(err, todo) {
      if (err) {
        res.send(err)};
      res.json(new_todo);
    });
  });
};



exports.delete_a_todo = function(req, res) {
  Todolist.findById(req.params.todoListId, function(err, todolist) {
    if (err) {
      res.send(err)};
    var targetList = todolist;
    targetList.todoList.pull(req.params.todoId);
    targetList.save(function(err, todo) {
      if (err) {
        res.send(err)};
      res.json({ message: 'todo item successfully deleted' });
    });
  });
};
