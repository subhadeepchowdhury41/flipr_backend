const mongoose = require('mongoose');

const Task = mongoose.model(
    "Task",
    new mongoose.Schema({
        employee: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        title: String,
        description: String,
        type: String,
        startTime: String,
        date: String,
        duration: String
    })
);

module.exports = Task;