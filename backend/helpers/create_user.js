var models = require('../models');
var literals = require('../helpers/literals');

module.exports=function(post, options = {}) {
  if (options.type) {
    post.password = uuid.v4().slice(1,20);
    post.type = options.type
  }
  return models.User.create({
    name: post.name,
    username: post.username,
    email: post.email,
    password: hasher.hash(post.password),
    type: post.type || literals.ACCOUNTS.LOCAL,
    phone: post.phone || "",
    address: post.address || ''
  })
}
