const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Task Model
const Task = require('../models/task');

// @route   GET api/tasks
// @desc    Get All Tasks
// @access  Public
router.get('/', (req, res) => {
    Task.find()
        .sort({ date: -1 })
        .then(tasks => res.json(tasks))
        .catch(err => {
            console.error(`Error fetching tasks: ${err.message}`);
            res.status(500).json({ success: false, message: "Error fetching tasks" });
        });
});



router.get('/completed', (req, res) => {
    Task.find({ status: 'completed' })
        .sort({ date: -1 })
        .then(tasks => res.json(tasks))
        .catch(err => {
            console.error(`Error fetching completed tasks: ${err.message}`);
            res.status(500).json({ success: false, message: "Error fetching completed tasks" });
        });
});


router.get('/incomplete', (req, res) => {
    Task.find({ status: 'incomplete' })
        .sort({ date: -1 })
        .then(tasks => res.json(tasks))
        .catch(err => {
            console.error(`Error fetching incomplete tasks: ${err.message}`);
            res.status(500).json({ success: false, message: "Error fetching incomplete tasks" });
        });
});
// @route   POST api/tasks
// @desc    Create A Task
// @access  Public
router.post('/', (req, res) => {
    const newTask = new Task({
        title: req.body.title,
        description: req.body.description,
        status: req.body.status
    });

    newTask.save()
        .then(task => res.json(task))
        .catch(err => {
            console.error(`Error saving task: ${err.message}`);
            res.status(500).json({ success: false, message: "Error saving task" });
        });
});

// @route   DELETE api/tasks/:id
// @desc    Delete A Task
// @access  Public
router.delete('/:id', (req, res) => {
    const taskId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(taskId)) {
        console.error(`Invalid Task ID: ${taskId}`);
        return res.status(400).json({ success: false, message: "Invalid Task ID" });
    }

    Task.findByIdAndDelete(taskId)
        .then(task => {
            if (!task) {
                console.error(`Task with ID ${taskId} not found`);
                return res.status(404).json({ success: false, message: "Task not found" });
            }
            res.json({ success: true });
        })
        .catch(err => {
            console.error(`Error deleting task: ${err.message}`);
            res.status(500).json({ success: false, message: "Error deleting task" });
        });
});

router.patch('/complete/:id', (req, res) => {
    const taskId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(taskId)) {
        console.error(`Invalid Task ID: ${taskId}`);
        return res.status(400).json({ success: false, message: "Invalid Task ID" });
    }

    Task.findById(taskId)
        .then(task => {
            if (!task) {
                console.error(`Task with ID ${taskId} not found`);
                return res.status(404).json({ success: false, message: "Task not found" });
            }

            if (task.status === 'completed') {
                return res.status(400).json({ success: false, message: "Task is already completed" });
            }

            task.status = 'completed';
            return task.save()
                .then(updatedTask => res.json(updatedTask))
                .catch(err => {
                    console.error(`Error updating task: ${err.message}`);
                    res.status(500).json({ success: false, message: "Error updating task" });
                });
        })
        .catch(err => {
            console.error(`Error finding task: ${err.message}`);
            res.status(500).json({ success: false, message: "Error finding task" });
        });
});


module.exports = router;
