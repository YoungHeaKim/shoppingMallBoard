const timestamps = require('mongoose-timestamp');
const paginate = require('mongoose-paginate');
const Schema = require('mongoose').Schema;
const articleSchema = Schema(
  {
    title: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [
        true,
        "제목은 입력해주세요"
      ]
    },
    thumbnail: {
      type: String
    },
    content: {
      type: String,
      required: [
        true,
        "내용을 입력해주세요"
      ]
    },
  },
  {
    toObject: { virtuals: true }
  });

articleSchema.plugin(timestamps);
articleSchema.plugin(paginate);

articleSchema.virtual('getDate').get(function () {
  const date = new Date(this.createdAt);
  return {
    date: date.getFullYear() + '.' + ("0" + (date.getMonth() + 1)).slice(-2) + '.' + ("0" + date.getDate()).slice(-2),
    time: ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2)
  }
})

articleSchema.virtual('updatedDate').get(function () {
  const date = new Date(this.updatedAt);
  return {
    date: date.getFullYear() + '.' + ("0" + (date.getMonth() + 1)).slice(-2) + '.' + ("0" + date.getDate()).slice(-2),
    time: ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2)
  }
})

module.exports = db.model('Article', articleSchema);