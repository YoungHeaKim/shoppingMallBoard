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
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate()
  }
})

commentsSchema.virtual('updatedDate').get(function () {
  const date = new Date(this.updatedAt);
  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate()
  }
})

module.exports = mongoose.model('Comments', commentsSchema);