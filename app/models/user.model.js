const mongoose = require('mongoose');

const User = mongoose.model(
    "User",
      new mongoose.Schema({
        username: String,
        email: String,
        password: String,
        active: Boolean,
        joiningDate: String,
        department: String,
        contactNo: String,
        profession: String,
        role: String,
        roles: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Role"
        }],
        tasks: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Task"
          }
        ]
      })
)

module.exports = User;