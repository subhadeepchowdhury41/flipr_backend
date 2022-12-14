const { task } = require("../models");
const db = require("../models");
const Task = require("../models/task.model");

const { addTaskForEmployee } = require("../services/task.services")

exports.addTask = async (req, res) => {

    await db.user.findOne({_id: Object(req.params.id)}).then(async user => {
        console.log(user);

        let task = new Task({
            date: req.body.date,
            duration: req.body.duration,
            type: req.body.type,
            description: req.body.description,
            startTime: req.body.startTime,
            employee: user._id
        });

        await addTaskForEmployee(req.params.id, task).then((employee) => {
            res.status(200).send({"result": "added successfully", "task": task});
        }).catch(err => {
            console.log(err);
            res.status(500).send({
                result: err.name,
                message: err.message
            });
        });
    }).catch((err) => {
        console.log(err);
        res.status(500).send({
            result: err.name,
            message: err.message
        });
    });
}

exports.getTasks = async (req, res) => {
    await db.task.find({employee: Object(req.params.id)}).then((result) => {
        console.log(result);
        res.status(200).send({tasks: result});
    }).catch(err => {
        console.log(err);
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