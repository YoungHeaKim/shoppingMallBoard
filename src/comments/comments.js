require('dotenv').config();

const express = require('express');
const query = require('../Query');

const posting = require('./comments.post.controller');
const deleting = require('./comments.delete.controller');

const app = express();

const router = express.Router();

// 댓글을 등록하는 부분
router.post('/shoppingmall/ajax_comment/insert', posting.postComments);

// 댓글을 삭제하는 부분
router.post('/shoppingmall/ajax_comment/delete', deleting.deleteCommnets);

// 답변 등록하는 부분
router.post('/shoppingmall/:_id/answer', posting.postAnswer);

module.exports = router;