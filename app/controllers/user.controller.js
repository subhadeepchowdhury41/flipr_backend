const db = require("../models");
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

exports.updateEmployee = (req, res) => {
    db.user.findByIdAndUpdate({_id: req.body.employeeId})
}

exports.getAllEmployees = (req, res) => {
    db.user.find().then((employees) => {
        res.status(200).send({employees: employees});
    }).catch(err => {
        res.status(500).send({result: err.name, message: err.message});
    })
}