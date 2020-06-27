const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const db = require('../../models')
const passport = require('passport')
const User = db.User

// 登入頁面
router.get('/login', (req, res) => {
  res.render('login')
})

// 註冊頁面
router.get('/register', (req, res) => {
  res.render('register')
})

// 登出
router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/users/login')
})

// 接收登入表單
router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login'
  })
)

// 接收註冊表單
router.post('/register', (req, res) => {
  const { name, email, password } = req.body
  User.findOne({ where: { email } }).then((user) => {
    if (user) {
      console.log('User already exists')
      return res.render('register', {
        name,
        email
      })
    }
    return bcrypt
      .genSalt(10)
      .then((salt) => bcrypt.hash(password, salt))
      .then((hash) =>
        User.create({
          name,
          email,
          password: hash
        })
      )
      .then(() => res.redirect('/'))
      .catch((err) => console.log(err))
  })
})

module.exports = router
