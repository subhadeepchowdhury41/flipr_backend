const mongoose = require("mongoose");

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
    impMsg: [
      {
        type: mongoose.Schema.Types.Mixed,
      },
    ],
    role: String,
    tasks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task",
      },
    ],
    smsLog: [{ type: mongoose.Schema.Types.Mixed }],
    callLog: [{ type: mongoose.Schema.Types.Mixed }],
  })
);

module.exports = User;
