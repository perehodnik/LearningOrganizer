'use strict';

const db = require("../models"),
      Todolist = db.Todolist,
      Todo = db.Todo,
      User = db.User;



exports.test = function(req, res) {
  res.send("yay you made it");
}

exports.create_a_todolist = async function(req, res, next){
  try {
    let todolist = await Todolist.create({
        todoListName: req.body.todoListName,
        todoList: [],
        user: req.params.id
    });
    let foundUser = await db.User.findById(req.params.id);
    foundUser.todolists.push(todolist._id);
    await foundUser.save();
    let foundTodolist = await db.Todolist.findById(todolist._id).populate("user", {
      username: true
    });
    return res.status(200).json(foundTodolist);
  }catch (err) {
    return next(err);
  }
}

exports.list_all_todolists = async function(req, res, next){
  try {
    let foundUser = await db.User.findById(req.params.id).populate("todolists");
    return res.status(200).json(foundUser.todolists);
  }catch (err) {
    return next(err);
  }
}

exports.read_a_todolist = function(req, res) {
  Todolist.findById(req.params.todoListId, function(err, todolist) {
    if (err) {
      res.send(err)};
    res.json(todolist.todoList);
  });
};

exports.delete_a_todolist = async function(req, res, next) {
  try {
    let foundTodolist = await Todolist.findById(req.params.todoListId).populate("user");
    if (foundTodolist && foundTodolist.user._id == req.params.id){
      await foundTodolist.remove();
      return res.status(200).json(foundTodolist);
    }else {
      return next({ status: 401, message: "Unauthorized" });
    }
  } catch (err) {
    return next(err);
  }
}

exports.create_a_todo = async function(req, res, next) {
  try {
    let new_todo = await Todo.create(req.body);
    let foundTodolist = await Todolist.findById(req.params.todoListId).populate("user");
    if (foundTodolist && foundTodolist.user._id == req.params.id){
      foundTodolist.todoList.push(new_todo);
      await foundTodolist.save();
      return res.status(200).json(new_todo);
    }else {
      return next({ status: 401, message: "Unauthorized" });
    }
  } catch (err) {
    return next(err);
  }
};


exports.delete_a_todo = async function(req, res, next) {
  try {
    let foundTodolist = await Todolist.findById(req.params.todoListId).populate("user");
    if (foundTodolist && foundTodolist.user._id == req.params.id){
      foundTodolist.todoList.pull(req.params.todoId);
      await foundTodolist.save();
      return res.status(200).json({ message: 'todo item successfully deleted' });
    }else {
      return next({ status: 401, message: "Unauthorized" });
    }
  } catch (err) {
    return next(err);
  }
};
