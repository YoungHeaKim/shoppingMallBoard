const express = require('express');

const cookie = require('./user.cookie.controller');
const register = require('./user.register.controller');

const app = express();

const router = express.Router();

// 회원가입 부분
router.get('/register', (req, res) => {
  res.render('login/register');
})

// 회원가입 저장하는 부분
router.post('/register', register.signUp);

// login 창
router.get('/login', (req, res) => {
  res.render('login/login');
})

// 로그아웃
router.get('/logout', cookie.cookieRemove);

module.exports = router;
