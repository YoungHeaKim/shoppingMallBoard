const express = require('express');

const cookie = require('./user.cookie.controller');
const join = require('./user.join.controller');

const app = express();

const router = express.Router();

// admin 회원가입 부분
router.get('/admin/join', (req, res) => {
  res.render('login/adminRegister');
})

// 파트너사 회원가입 부분
router.get('/join', (req, res) => {
  res.render('login/Register');
})

// admin 회원가입 저장하는 부분
router.post('/admin/join', join.adminSignUp);

// 회원가입 저장하는 부분
router.post('/join', join.signUp);

// 로그인
router.post('/cookie', cookie.cookie);

// login 창
router.get('/login', (req, res) => {
  res.render('login/login');
})

// 로그아웃
router.get('/logout', cookie.cookieRemove);


// user 수정하는 페이지
router.get('/edit', (req, res) => {
  res.render('login/edit');
})

// 수정하는 부분(ejs에서)
router.post('/edit', join.edit);
// 수정하는 부분(back)
router.put('/edit', join.edit);

module.exports = router;