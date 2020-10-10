var express  = require('express');
var router = express.Router();
const https = require('https');
const bodyParser = require('body-parser');
const User = require('../models/User');
const Task = require('../models/Task');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

// Get all tasks
router.get('/requester/tasks', (req, res) => {
    Task.find((err, taskList) => {
        if (err) {
            res.json(err);
        }
        else {
            res.json(taskList);
        }
    });
});

// Create a new task
router.post('/requester/tasks', (req, res) => {
    const task = new Task({ 
        requesterId: '5f765a458f54040004e70a61', // TODO - change to current user
        title: req.body.title,
        description: req.body.description,
        type: req.body.type,
        setup: req.body.setup,
        master: req.body.master,
        numberWorkers: req.body.numberWorkers,
        reward: req.body.reward,
        expiry: Date.parse(req.body.expiry),
        createdAt: Date.now()
    });
    task.save((err) => {
        if (err) {
            res.json(err);
        }
        else {
            res.json({ 
                status: 'success', 
                message: 'Task successfully added.' 
            })
        }
    });
});

router.post('/image-upload', (req, res) => {
    console.log(req.files);
    const image = req.files.myFile;
    const filename = uuidv4() + path.extname(image.name);
    const location = './public/uploads/' + filename;
    
    image.mv(location, (error) => {
        if (error) {
            console.error(error);
            res.writeHead(500, {
                'Content-Type': 'application/json'
            });
            res.end(JSON.stringify({ status: 'error', message: error }));
            return;
        }
    
        res.writeHead(200, {
            'Content-Type': 'application/json'
        });
        res.end(JSON.stringify({ status: 'success', path: '/uploads/' + filename }));
    })
  })

module.exports = router;
