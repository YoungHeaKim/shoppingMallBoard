const query = require('../Query');
const jwt = require('jsonwebtoken');
const paginate = require('express-paginate');

exports.mainPage = async (req, res) => {
  // paginate부분
  const [results, itemCount] = await Promise.all([
    query.findAllArticle().sort('-createdAt').limit(req.query.limit).skip(req.skip).exec(),
    query.ArticleCount()
  ]);
  // article writer와 user db에 있는 user의 이름을 articleList라는 배열에 저장하는 부분
  const articleList = [];
  for (let idx = 0; idx < results.length; idx++) {
    const articleObj = {};
    const user = await query.checkUserBy_id(results[idx].title);
    articleObj._id = results[idx]._id;
    articleObj.title = user.nickname;
    articleObj.getDate = results[idx].getDate;
    articleObj.updatedDate = results[idx].updatedDate;
    articleObj.createdAt = results[idx].createdAt;
    articleList.push(articleObj);
  }
  
  // const pageCount = Math.ceil(itemCount / req.query.limit);
  

  // const pages = paginate.getArrayPages(req)(5, pageCount, req.query.page);

  res.status(200).render('article/main', {
    articleList: articleList,
    // pages: pages,
    // pageCount: pageCount,
  });
};

exports.articlePage = async (req, res) => {
  // 1. 로그인되어 있는 유저의 정보를 가져옴
  const token = req.cookies.auth;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const users = await query.checkUserBy_id(decoded.id);
  // 1. 원하는 글의 정보를 불러오는 부분
  const article = await query.findArticleByTitle(users._id);
  if (!article) {
    console.log('게시글부분 오류')
    res.status(400).json('게시글이 없습니다.')
  }
  const user = await query.checkUserBy_id(article.title);
  const title = user.nickname;
  res.status(200).render('article/show.ejs', {
    article: article,
    title : title,
  });
};

exports.articleAdminPage = async (req, res) => {
  // 1. 원하는 글의 정보를 불러오는 부분
  const article = await query.findArticleById(req.params._id);
  if (!article) {
    console.log('게시글부분 오류')
    res.status(400).json('게시글이 없습니다.')
  }
  const user = await query.checkUserBy_id(article.title);
  const title = user.nickname;
  res.status(200).render('article/show.ejs', {
    article: article,
    title: title,
  });
};

exports.adminPage = async (req, res) => {
  // paginate부분
  const [results, itemCount] = await Promise.all([
    query.findAllArticle().sort('-createdAt').limit(req.query.limit).skip(req.skip).exec(),
    query.ArticleCount()
  ]);
  // article writer와 user db에 있는 user의 이름을 articleList라는 배열에 저장하는 부분
  const articleList = [];
  for (let idx = 0; idx < results.length; idx++) {
    const articleObj = {};
    const user = await query.checkUserBy_id(results[idx].writer);
    articleObj._id = results[idx]._id;
    articleObj.title = user.nickname;
    articleObj.getDate = results[idx].getDate;
    articleObj.updatedDate = results[idx].updatedDate;
    articleObj.createdAt = results[idx].createdAt;
    articleList.push(articleObj);
  }

  const pageCount = Math.ceil(itemCount / req.query.limit);


  const pages = paginate.getArrayPages(req)(5, pageCount, req.query.page);

  res.status(200).render('article/main', {
    articleList: articleList,
    pages: pages,
    pageCount: pageCount,
  });
};