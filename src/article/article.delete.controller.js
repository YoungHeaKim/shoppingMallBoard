require('dotenv').config();

const query = require('../Query');
const aws = require('aws-sdk');
const s3 = new aws.S3();
const jwt = require('jsonwebtoken');

exports.delete = async (req, res) => {
  // 1. 로그인이 되어있는 정보 가져오기
  const token = req.cookies.auth;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await query.checkUserBy_id(decoded.id);
  
  const articleRemove = await query.findArticleById(req.params._id);
  // main 사진이 있을 때 s3에서 사진 삭제
  if (req.thumbnail) {
    const params = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: articleRemove.thumbnail
    }
    s3.deleteObject(params, (err, data) => {
      if (err) {
        console.log(err)
      }
    })
  }
  const comments = await query.deleteCommentFromArticle(req.params._id);
  const article = await query.removeArticle({ _id: req.params._id });
  if (!article) {
    return res.status(500).json({ error: "데이터베이스 연결상에 문제가 있습니다." });
  }
  if(user.admin === true) {
    res.status(204).redirect('/');    
  }
  res.status(204).redirect('/shoppingmall/register');
};