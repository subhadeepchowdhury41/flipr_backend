const mongoose = require("mongoose");

const Context = mongoose.model(
  "Context",
  new mongoose.Schema({
    impMsg: [mongoose.Schema.Types.Mixed],
    listen: Boolean,
  })
);

module.exports = Context;