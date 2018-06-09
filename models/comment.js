const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
const paginate = require('mongoose-paginate');
const bcrypt = require('bcrypt-nodejs');

const Schema = require('mongoose').Schema;

const commentsSchema = Schema({
  content: {
    type: String
  },
  writer: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  shoppingMall_id:{
    type: Schema.Types.ObjectId,
    ref: 'Article'
  },
  answer: [{
    writer: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    content: {
      type: String
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }]
});

commentsSchema.plugin(timestamps);
commentsSchema.plugin(paginate);

commentsSchema.virtual('getDate').get(function () {
  const date = new Date(this.createdAt);
  return {
    date: date.getFullYear() + '.' + ("0" + (date.getMonth() + 1)).slice(-2) + '.' + ("0" + date.getDate()).slice(-2),
    time: ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2)
  }
})

commentsSchema.virtual('updatedDate').get(function () {
  const date = new Date(this.updatedAt);
  return {
    date: date.getFullYear() + '.' + ("0" + (date.getMonth() + 1)).slice(-2) + '.' + ("0" + date.getDate()).slice(-2),
    time: ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2)
  }
})
commentsSchema.virtual('answerDate').get(function () {
  const date = new Date(this.answer.createdAt);
  return {
    date: date.getFullYear() + '.' + ("0" + (date.getMonth() + 1)).slice(-2) + '.' + ("0" + date.getDate()).slice(-2),
    time: ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2)
  }
})

module.exports = mongoose.model('Comments', commentsSchema);