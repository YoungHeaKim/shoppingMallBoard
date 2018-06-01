const Comments = require('../../models/comment');

module.exports = {
  findCommentsByShoppingMall_id(id) {
    return Comments.find({
      shoppingMall_id : id
    });
  },
  createComments(data) {
    return Comments.create({
      content : data.content,
      shoppingMall_id : data.shoppingMall_id,
      writer: data.writer
    });
  },
  deleteComment(data) {
    return Comments.remove({
      _id : data
    });
  },
  deleteCommentFromArticle(data) {
    return Comments.remove({
      shoppingMall_id : data
    })
  }
}