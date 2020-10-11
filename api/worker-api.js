var express  = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
const User = require('../models/User');
const Task = require('../models/Task');
const WorkerTask = require('../models/WorkerTask');

// Get all tasks available to the worker
router.get('/worker/tasks', (req, res, next) => {
            // Get tasks belonging to the authenticated user
            Task.aggregate([
                {$match: {'status': 'AVAILABLE'} },
                {
                    $lookup:
                    {
                        from: 'WorkerTask',
                        localField: '_id',
                        foreignField: 'taksId',
                        as: 'workerTask'
                    }
                }], (err, taskList) => {
                    if (err) {
                        res.json(err);
                    }
                    else {
                        res.json(taskList);
                    }
            });
    // passport.authenticate('jwt', { session: false }, (err, user, info) => {
    //     if (err) {
    //         console.log(err);
    //     }
    //     if (info !== undefined) {
    //         console.log(info.message);
    //         res.status(401).send(info.message);
    //     } 
    //     else {
    //         // Get tasks available to the authenticated user
    //         Task.find({ status: 'AVAILABLE' }, (err, taskList) => {
    //             if (err) {
    //                 res.json(err);
    //             }
    //             else {
    //                 res.json(taskList);
    //             }
    //         });
    //     }
    // })(req, res, next);
});


module.exports = router;