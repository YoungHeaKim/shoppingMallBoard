const Comments = require('../../models/comment');

module.exports = {
  findCommentsByShoppingMall_id(id) {
    return Comments.find({
      shoppingMall_id: id
    }).populate('writer').populate('answer');
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
    });
  },
  findCommnetsByShoppingmall_idAndDate(Id, date) {
    return Comments.find({
      $and : [
        { shoppingMall_id : Id}, 
        { createdAt: { $gte: date } }
      ]
    }).sort({ createdAt: -1 });
  },
  createAnswer(Id, data) {
    return Comments.update(Id, {
      $unshift : {
        answer : data
      }
    });
  },
  findCommentsBy_id(data) {
    return Comments.findOne({
      _id : data
    });
  }
}