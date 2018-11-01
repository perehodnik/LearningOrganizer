'use strict';
var express = require("express");
var mongoose = require('mongoose');
var todoList = require('../controllers/todoListController');

const router = express.Router({ mergeParams: true });

router.get("/", todoList.list_all_todolists);
router.post("/", todoList.create_a_todolist);
router.get("/:todoListId", todoList.read_a_todolist);
router.delete("/:todoListId", todoList.delete_a_todolist);
router.post("/:todoListId", todoList.create_a_todo);
router.delete("/:todoListId/:todoId", todoList.delete_a_todo);


module.exports = router;

