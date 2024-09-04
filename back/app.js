const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const tasks = require('./routes/task');
const cors =require('cors');

const app = express();
const PORT = 5000;
app.use(cors());

// Middleware
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/todoList')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));



app.use(tasks);
app.use('/:id',tasks);
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
