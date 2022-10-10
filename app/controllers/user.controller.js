const User = require("../models/user.model");

exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
};
  
exports.employeeBoard = (req, res) => {
    res.status(200).send("Employee Content.");
};
  
exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
};

exports.addEmployee = (req, res) => {
    let employee = new User({
        username: req.username
    });
}