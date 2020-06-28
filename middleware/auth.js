module.exports = {
  authenticator: (req, res, next) => {
    if (req.isAuthenticated()) return next()
    req.flash('alert', '請先登入帳號！')
    return res.redirect('/users/login')
  }
}
