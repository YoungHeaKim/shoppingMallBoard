const { ...AuthQuery } = require('./AuthQuery');
const { ...ShoppingmallQuery } = require('./Shoppingmall');

module.exports = {
  ...AuthQuery,
  ...ShoppingmallQuery,
};