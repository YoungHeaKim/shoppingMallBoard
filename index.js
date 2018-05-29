require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const http = require('http');

const PORT = process.env.PORT || 3000;
const app = express();

// passport 관련
const passport = require('passport');
const session = require('express-session');

// mongodb 접속
const mongoose = require('mongoose');
global.db = mongoose.createConnection(process.env.MONGO_URI);
const server = http.Server(app);
// user 부분
const User = require('./src/user/user');

// ejs 템플릿
// 확장자가 ejs 로 끈나는 뷰 엔진을 추가한다.
app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'ejs');

// 미들웨어 셋팅
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/user', User);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Successfully connected to mongodb'))
  .catch(e => console.error(e));

server.listen(PORT, () => {
  console.log(`Able to connect to ${PORT}`);
});

module.exports = server;