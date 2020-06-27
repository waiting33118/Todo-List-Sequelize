module.exports = {
  authenticator: (req, res, next) => {
    if (req.isAuthenticated()) return next()
    console.log('You are not login yet!')
    return res.redirect('/users/login')
  }
}
