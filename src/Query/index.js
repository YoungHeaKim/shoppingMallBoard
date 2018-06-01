const { ...AuthQuery } = require('./AuthQuery');
const { ...ArticleQuery } = require('./ArticleQuery');
const { ...CommentsQuery } = require('./CommentsQuery');

module.exports = {
  ...AuthQuery,
  ...ArticleQuery,
  ...CommentsQuery,
};