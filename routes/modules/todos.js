const express = require('express')
const router = express.Router()
const db = require('../../models')
const Todo = db.Todo

// 新增Todo頁面
router.get('/new', (req, res) => {
  res.render('new')
})

// 詳細Todo頁面
router.get('/:id', (req, res) => {
  const UserId = req.user.id
  const id = req.params.id
  return Todo.findOne({ where: { UserId, id } })
    .then((todo) => {
      res.render('detail', { todo: todo.toJSON() })
    })
    .catch((error) => console.log(error))
})

// 修改Todo頁面
router.get('/:id/edit', (req, res) => {
  const UserId = req.user.id
  const id = req.params.id
  return Todo.findOne({ where: { UserId, id } })
    .then((todo) => {
      res.render('edit', { todo: todo.toJSON() })
    })
    .catch((error) => console.log(error))
})

// 接收Todo新增
router.post('/new', (req, res) => {
  const UserId = req.user.id
  const { name } = req.body
  Todo.create({ name, UserId }).catch((error) => console.log(error))
  res.redirect('/')
})

// 接收Todo修改
router.put('/:id', (req, res) => {
  const UserId = req.user.id
  const id = req.params.id
  const { isDone, name } = req.body
  return Todo.findOne({ where: { UserId, id } })
    .then((todo) => {
      const status = isDone === 'on' ? 1 : 0
      todo.isDone = status
      todo.name = name
      todo.save()
    })
    .then(() => res.redirect('/'))
    .catch((error) => console.log(error))
})

// 接收Todo刪除
router.delete('/:id', (req, res) => {
  const UserId = req.user.id
  const id = req.params.id
  return Todo.findOne({ where: { UserId, id } })
    .then((todo) => {
      todo.destroy()
      res.redirect('/')
    })
    .catch((error) => console.log(error))
})

module.exports = router
