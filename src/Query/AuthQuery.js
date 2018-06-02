const User = require('../../models/user');

module.exports = {
  checkIdExist(username) {
    return User.findOne({
      username: username
    });
  },
  checkNicknameExist(nickname) {
    return User.findOne({
      nickname: nickname
    });
  },
  createUser(data) {
    return User.create({
      username: data.username,
      password: data.password,
      nickname: data.nickname,
      companyUrl: data.companyUrl,
      admin : data.admin,
    })
  },
  checkUserBy_id(data) {
    return User.findById(data)
  },
  updateUser(id, data) {
    return User.findByIdAndUpdate(id, {
      username: data.username,
      password: data.password,
      nickname: data.nickname
    })
  },
}