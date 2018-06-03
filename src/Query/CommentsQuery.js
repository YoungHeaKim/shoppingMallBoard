const Comments = require('../../models/comment');

module.exports = {
  findCommentsByShoppingMall_id(id) {
    return Comments.find({
      shoppingMall_id: id
    });
  },
  createComments(data) {
    return Comments.create({
      content: data.content,
      shoppingMall_id: data.shoppingMall_id,
      writer: data.writer
    });
  },
  deleteComment(data) {
    return Comments.remove({
      _id: data
    });
  },
  deleteCommentFromArticle(data) {
    return Comments.remove({
      shoppingMall_id: data
    })
  },
  findAllCommnets(data) {
    return Comments.find(data)
  },
  createAnswer(Id, data) {
    return Comments.update(Id, {
      $push : {
        answer : data
      }
    })
  },
  findCommentsBy_id(data) {
    return Comments.findOne({
      _id : data
    })
  }
}