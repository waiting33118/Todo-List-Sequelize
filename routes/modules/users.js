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
  req.flash('success', '成功登出！')
  res.redirect('/users/login')
})

// 接收登入表單
router.post(
  '/login',
  (req, res, next) => {
    const { email, password } = req.body
    if (email === '' || password === '') {
      req.flash('alert', '請輸入帳號密碼！')
      return res.redirect('/users/login')
    }
    return next()
  },
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
    failureFlash: true
  })
)

// 接收註冊表單
router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  const errors = []

  if (
    name === '' ||
    email === '' ||
    password === '' ||
    confirmPassword === ''
  ) {
    errors.push({ message: '所有欄位均為必填！' })
  }
  if (password !== confirmPassword) {
    errors.push({ message: '密碼與確認密碼不相符！' })
  }
  User.findOne({ where: { email } }).then((user) => {
    if (user) {
      errors.push({ message: '此帳號已被註冊！' })
    }
    if (errors.length) {
      return res.render('register', {
        name,
        email,
        errors
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
