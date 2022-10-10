const { task } = require("../models");
const db = require("../models");
const Task = require("../models/task.model");

const { addTaskForEmployee } = require("../services/task.services")

exports.addTask = async (req, res) => {

    await db.user.findOne({_id: Object(req.body.employeeId)}).then(async user => {
        console.log(user);

        let task = new Task({
            date: req.body.date,
            duration: req.body.duration,
            title: req.body.title,
            description: req.body.description,
            startTime: req.body.startTime,
            employee: user
        });

        await addTaskForEmployee(req.body.employeeId, task).then(() => {
            res.status(200).send({"result": "added successfully"});
        }).catch(err => {
            console.log(err);
        });
    }).catch((err) => {
        res.status(500).send({
            result: err.name,
            message: err.message
        });
    });
}

exports.getTasks = async (req, res) => {
    await db.task.find({employee: Object(req.params.id)}).then((result) => {
        res.status(200).send({tasks: result});
    }).catch(err => {
        res.status(500).send({message: err.message, result: err.name});
    });
    
}

exports.deleteTask = async (req, res) => {
    id = req.params.id;
    await db.task.findByIdAndDelete({_id: Object(id)}).then(async (result) => {
        if (result.employee === null || result.employee === undefined) {
            res.status(404).send({result: "No valid task found"});
        } else {
            await db.user.findById({_id: result.employee}).updateOne(
                {},
                {$pull: {"tasks": id}}
            ).then(() => {
                res.status(200).send({result: "deleted successfully"});
            }).catch(err => {
                res.status(500).send({
                    result: err.name,
                    message: err.message
                })
            });
        }
    }).catch(err => {
        res.status(500).send({result: err.name, message: err.message});
    });
}