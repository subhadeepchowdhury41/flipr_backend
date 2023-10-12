const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const db = {}

db.mongoose = mongoose;

db.user = require('./user.model');
db.role = require('./role.model');
db.task = require('./task.model');
db.refreshToken = require('./refreshToken.model');
db.context = require('./context.model');

db.ROLES = ["admin", "employee"];

module.exports = db