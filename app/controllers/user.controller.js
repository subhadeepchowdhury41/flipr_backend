const { task } = require("../models");
const db = require("../models");
const User = require("../models/user.model");

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.getEmployee = (req, res) => {
  db.user
    .findById(req.params.id)
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      res.status(500).send({ result: err.name, message: err.message });
    });
}

exports.employeeBoard = (req, res) => {
  res.status(200).send("Employee Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.updateEmployee = (req, res) => {
  db.user
    .findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
      db.user.findById(req.params.id).then((user) => {
        res.status(200).send(user);
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message, result: err.name });
    });
};

exports.getAllEmployees = (req, res) => {
  db.user
    .find()
    .then((employees) => {
      res.status(200).send({ employees: employees });
    })
    .catch((err) => {
      res.status(500).send({ result: err.name, message: err.message });
    });
};

exports.deleteEmployee = (req, res) => {
  db.user
    .findByIdAndDelete({ _id: Object(req.params.id) })
    .then(() => {
      db.task.deleteMany({ employee: req.params.id }).then(() => {
        res.status(200).send({ result: "Employee removed Successfully" });
      });
    })
    .catch((err) => {
      res.status(500).send({ result: err.name, message: err.message });
    });
};

exports.addToUserCallLogs = (req, res) => {
  db.user
    .findByIdAndUpdate(req.params.id, { $push: { callLog: req.body.log } })
    .then(() => {
      res.status(200).send({
        result: "Call Logs added Successfully",
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message, result: err.name });
    });
};

exports.addToUserSmsLog = (req, res) => {
  db.user
    .findByIdAndUpdate(req.params.id, { $push: { smsLog: req.body.log } })
    .then(() => {
      res.status(200).send({
        result: "Messages added Successfully",
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message, result: err.name });
    });
};


exports.addImpMsgofUser = (req, res) => {
  console.log(req.body);
  db.user
    .findByIdAndUpdate(req.params.id, {
      $push: {
        impMsg: {
          msg: req.body.msg,
          sender: req.body.from,
          time: req.body.time,
    } } })
    .then(() => {
      res.status(200).send({
        result: "Messages added Successfully",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: err.message, result: err.name });
    });
}