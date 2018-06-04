const query = require('../Query');
const jwt = require('jsonwebtoken');

exports.postComments = async (req, res) => {
  // 1. 로그인되어 있는 유저의 정보를 가져옴
  const token = req.cookies.auth;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await query.checkUserBy_id(decoded.id);
  const CommentInfo = {
    content: req.body.content,
    shoppingMall_id: req.body.shoppingMall_id,
    writer: user._id
  }
  const comment = await query.createComments(CommentInfo);
  if (comment) {
    return res.status(200).json({
      id: comment.id,
      content: comment.content,
      writer: comment.writer,
      message: "success"
    })
  }
}

// 이부분 오류(ajax);
exports.postAnswer = async (req, res) => {
  // 1. 로그인되어 있는 유저의 정보를 가져옴
  const token = req.cookies.auth;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await query.checkUserBy_id(decoded.id);
  const CommentInfo = {
    content : req.body.content,
    writer : user.id,
  }
console.log(comment_id);

  const comments = await query.createAnswer({_id : comment_id}, CommentInfo);
  
  const comment = await query.findCommentsBy_id(comments._id)
  if (comments) {
    return res.status(200).json({
      id: comment.id,
      content: comment.content,
      writer: comment.writer,
      message: "success"
    });
  }
}