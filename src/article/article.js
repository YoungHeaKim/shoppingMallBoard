require('dotenv').config();

const express = require('express');
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const path = require('path');
const paginate = require('express-paginate');
const query = require('../Query');

// csrf 셋팅
var csrf = require('csurf');
var csrfProtection = csrf({ cookie: true });

//이미지 저장되는 위치 설정
const uploadDir = path.join(__dirname, '../../uploads');
const fs = require('fs');

// aws s3 부분
const awsAccessKey = process.env.AWS_ACCESS_KEY;
const awsSecretKey = process.env.AWS_SECRET_KEY;
const s3 = new aws.S3({
  accessKeyId: awsAccessKey,
  secretAccessKey: awsSecretKey,
});

// s3에 사진 업로드
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.S3_BUCKET_NAME,
    key: (req, file, cb) => {
      let extension = path.extname(file.originalname);
      cb(null, Date.now().toString() + extension)
    },
    acl: 'public-read-write',
  })
});

// uploads파일에 사진 업로드
const uploadPic = multer({
  storage: multer.diskStorage({
    destination: function (req, file, callback) { //이미지가 저장되는 도착지 지정
      callback(null, uploadDir);
    },
    filename: function (req, file, callback) { // products-날짜.jpg(png) 저장 
      callback(null, 'products-' + Date.now() + '.' + file.mimetype.split('/')[1]);
    }
  })
});

const getting = require('./article.get.controller');
const posting = require('./article.post.controller');
const putting = require('./article.put.controller');
const deleting = require('./article.delete.controller');
const adminRequired = require('../libs/adminRequired');

const app = express();

const router = express.Router();

// admin만 home으로 가는 부분
router.get('/', adminRequired, getting.mainPage);

// 새로운 쇼핑몰 등록하는 부분
router.get('/shoppingmall/register', csrfProtection, async (req, res) => {
  const user = await query.checkUserBy_id(req.user);
  res.render('admin/form', { csrfToken: req.csrfToken(), article: "", user: user, editPage: "" })
});

// 게시글 등록하는 부분
router.post('/shoppingmall/register', upload.single('thumbnail'), csrfProtection, posting.createArticle);

// 쇼핑몰의 글을 보는 부분
router.get('/shoppingmall', csrfProtection, getting.articlePage)

// admin으로 로그인했을때 쇼핑몰의 글을 보는 부분
router.get('/shoppingmall/:_id', csrfProtection, getting.articleAdminPage)

// 게시글 수정하는 페이지
router.get('/shoppingmall/edit/:_id', csrfProtection, async (req, res) => {
  const article = await query.findArticleById(req.params._id);  
  if (!article) {
    res.status(400).json('해당 게시글을 불러 올 수 없습니다.')
  }
  const editPage = req.params;
  const user = await query.checkUserBy_id(req.user);  
  res.status(200).render('admin/form', { article: article, editPage: req.params, csrfToken: req.csrfToken(), user: user });
});

// 게시글 수정하는 부분
router.post('/shoppingmall/edit/:_id', upload.single('thumbnail'), csrfProtection, putting.edit);
router.put('/shoppingmall/edit/:_id', upload.single('thumbnail'), csrfProtection, putting.edit);

// 게시글 삭제하는 부분
router.get('/delete/:_id', deleting.delete);
router.delete('/delete/:_id', deleting.delete);

// summernote 부분
router.post('/ajax_summernote', uploadPic.single('thumbnail'), (req, res) => {
  res.send('/uploads/' + req.file.filename);
});

module.exports = router;