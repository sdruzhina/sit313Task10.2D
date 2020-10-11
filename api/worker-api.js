var express  = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
const User = require('../models/User');
const Task = require('../models/Task');
const WorkerTask = require('../models/WorkerTask');

// Get all tasks
router.get('/worker/tasks', (req, res) => {
    Task.find((err, taskList) => {
        if (err) {
            res.json(err);
        }
        else {
            res.json(taskList);
        }
    });
});


module.exports = router;