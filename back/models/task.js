const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const TaskSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['completed', 'incomplete'],
        default: 'incomplete'
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Task = mongoose.model('task', TaskSchema);
