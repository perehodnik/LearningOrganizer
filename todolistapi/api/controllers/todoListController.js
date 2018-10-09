'use strict';


var mongoose = require('mongoose'),
        Todo = mongoose.model('Todo'),
        Todo2 = mongoose.model('Todo2'),
     todoMap = {'todos':Todo, 'todo2':Todo2},
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

exports.list_all_todos = function(req, res) {
  todoMap[req.params.todoListId].find({}, function(err, todo) {
    if (err) {
      res.send(err)};
    res.json(todo);
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


exports.read_a_todo = function(req, res) {
  todoMap[req.params.todoListId].findById(req.params.todoId, function(err, todo) {
    if (err) {
      res.send(err)};
    res.json(todo);
  });
};


exports.update_a_todo = function(req, res) {
  todoMap[req.params.todoListId].findOneAndUpdate({_id: req.params.todoId}, req.body, {new: true}, function(err, todo) {
    if (err) {
      res.send(err)};
    res.json(todo);
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
