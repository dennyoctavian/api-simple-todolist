var express = require('express');
const Todo = require('../models').Todo;
const Category = require('../models').Category;
var router = express.Router();

router.get('/todo', async (req, res, next) => {
  const todos = await Todo.findAll({ include: [{model: Category}], attributes: {exclude: ['CategoryID']},   order: [
    ["timeDeadline", "ASC"]
  ], })
  return res.status(200).json({
    message: "Sucess get all todos",
    data: todos
  });
});

router.post('/create-todo', async (req, res, next) => {
  const {task, time_deadline, category_id} = req.body

  const todo = await Todo.create({
    timeDeadline : time_deadline,
    task : task,
    categoryID : category_id,
    status: "on process"
  });
  return res.status(200).json({
    message: "Sucess save todo",
    data: todo
  });
});

router.put('/completed-todo/:id', async (req, res, next) => {
  const id = req.params.id
  const todo = await Todo.findByPk(parseInt(id))
  todo.status = "done"
  todo.save()
  return res.status(200).json({
    message: `${todo.task} success change to done`,
    data: todo
  });
});

router.put('/update-todo/:id', async (req, res, next) => {
  const id = req.params.id
  const {task, time_deadline, category_id} = req.body
  await Todo.update({ task: task, timeDeadline: time_deadline, categoryID:category_id }, {
    where: {
      id: id
    }
  });
  return res.status(200).json({
    message: "Sucess update todo",
    data: todo
  });
})

router.delete('/delete-todo/:id', async function(req, res, next) {
  const id = req.params.id
  const todo = await Todo.destroy({
    where: {
      id : id
    }
})
  return res.status(200).json({
    message: "Sucess delete todo",
    data: todo
  });
})

router.get('/todo-ongoing', async (req, res, next) => {
  const todos = await Todo.findAll({ where: { status: "on process" }, include: [{model: Category}], attributes: {exclude: ['CategoryID']}, order: [
    ["timeDeadline", "ASC"]
  ], })
  return res.status(200).json({
    message: "Sucess get all todos on going",
    data: todos
  });
});

router.get('/todo-done', async (req, res, next) => {
  const todos = await Todo.findAll({ where: { status: "done" }, include: [{model: Category}], attributes: {exclude: ['CategoryID']}, order: [
    ["timeDeadline", "ASC"]
  ], })
  return res.status(200).json({
    message: "Sucess get all todos done",
    data: todos
  });
});

router.post('/create-category', async (req, res, next) => {
  const {name} = req.body

  const category = await Category.create({
    name: name
  });
  return res.status(200).json({
    message: "Sucess save category",
    data: category
  });
});

module.exports = router;
