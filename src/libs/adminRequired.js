module.exports = function (req, res, next) {
  if (!req.isAuthenticated()) {
    res.redirect('/user/login');
  } else {
    if (req.user.admin !== true) {
      res.send('<script>alert("관리자만 접근가능합니다.");location.href="/shoppingmall";</script>');
    } else {
      return next();
    }
  }
};