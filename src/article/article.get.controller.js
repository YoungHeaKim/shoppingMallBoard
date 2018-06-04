const query = require('../Query');
const jwt = require('jsonwebtoken');
const paginate = require('express-paginate');

exports.mainPage = async (req, res) => {
  const results = await query.findAllArticle().sort('-createdAt').populate('writer');
  // article writer와 user db에 있는 user의 이름을 articleList라는 배열에 저장하는 부분
  const allArticleList = [];
  for (let idx = 0; idx < results.length; idx++) {
    const articleObj = {};
    const user = await query.checkUserBy_id(results[idx].title);
    articleObj._id = results[idx]._id;
    articleObj.thumbnail = results[idx].thumbnail;
    articleObj.title = user.nickname;
    articleObj.getDate = results[idx].getDate;
    articleObj.updatedDate = results[idx].updatedDate;
    articleObj.createdAt = results[idx].createdAt;
    allArticleList.push(articleObj);
  }
  // 1주일의 조건을 넣지 못한 오류
  // const oneWeek = new Date() - 60 * 60 * 1000 * 24 * 7;
  // const allComments = await query.findAllCommnetsByDate(oneWeek);
  const articleHaveComments = [];
  for(let idx = 0; idx < allArticleList.length; idx++) {
    const Comments = await query.findCommentsByShoppingMall_id(allArticleList[idx]._id).populate('writer');
    let articleObj = {};
    articleObj.lastestComments = Comments[0];
    articleObj.writer = allArticleList[idx].title;
    articleObj.article = allArticleList[idx];
    articleObj.length = Comments.length;
    articleHaveComments.push(articleObj);
  }
  
  articleHaveComments.sort((a, b) => {
    return a.createdAt - b.createdAt;
  });
  articleHaveComments.sort((a, b) => {
    return a.comments.length - b.comments.length;
  });

  res.status(200).render('article/main', {
    allArticleList: results,
    adminArticleList: articleHaveComments,
  });
};

exports.articlePage = async (req, res) => {
  // 1. 로그인되어 있는 유저의 정보를 가져옴
  const token = req.cookies.auth;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const users = await query.checkUserBy_id(decoded.id);
  // 2. 원하는 글의 정보를 불러오는 부분
  const article = await query.findArticleByTitle(users._id).populate('title');
  const comments = await query.findCommentsByShoppingMall_id(article._id).populate('writer');
  
  if (!article) {
    console.log('게시글부분 오류')
    res.status(400).json('게시글이 없습니다.')
  }
  const user = await query.checkUserBy_id(article.title);

  res.status(200).render('article/show.ejs', {
    article: article,
    user : user,
    comments: comments,
    users: users
  });
};

exports.articleAdminPage = async (req, res) => {
  // 1. 로그인되어 있는 유저의 정보를 가져옴
  const token = req.cookies.auth;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const users = await query.checkUserBy_id(decoded.id);
  // 2. 원하는 글의 정보를 불러오는 부분
  const article = await query.findArticleById(req.params._id).populate("title");
  const comments = await query.findCommentsByShoppingMall_id(article._id).populate('writer').populate('answer');
  let answerList = [];
  for (let idx = 0; idx < comments.length; idx++) {
    let answerObj = {};
    answerObj.answer = comments[idx].answer;
    answerList.push(answerObj);
  }
  console.log(answerList[0].answer);
  
  
  if (!article) {
    console.log('게시글부분 오류')
    res.status(400).json('게시글이 없습니다.')
  }
  const user = await query.checkUserBy_id(article.title);
  res.status(200).render('article/show.ejs', {
    article: article,
    user: user,
    comments: comments,
    users: users
  });
};