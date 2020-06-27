const express = require('express')
const router = express.Router()
const db = require('../../models')
const Todo = db.Todo

router.get('/', (req, res) => {
  const UserId = req.user.id
  return Todo.findAll({
    raw: true,
    nest: true,
    where: { UserId },
    order: [['createdAt', 'DESC']]
  })
    .then((todos) => res.render('home', { todos }))
    .catch((error) => console.log(error))
})

module.exports = router
