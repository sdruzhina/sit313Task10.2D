import React, { useState, useEffect } from 'react';
import TaskCard from './TaskCard'

function TaskList() {

  // List of available tasks
  const [tasks, setTasks] = useState([]);

  // Load cards on mount
  useEffect(() => {
    const token = localStorage.getItem('JWT');
    fetch('http://localhost:8080/worker/tasks', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${token}`
      }
    })
    .then(res => res.json())
    .then(res => setTasks(res))
    .catch((err) => console.log(err));
  }, []);

  // Delete task for this worker
  const onDelete = (taskId) => {
    // Remove the task from the array
    setTasks(tasks.filter(task => task._id !== taskId));

    // Send the request to the API
    const token = localStorage.getItem('JWT');
    const userId = (JSON.parse(localStorage.getItem('user')))._id;
    fetch(`http://localhost:8080/worker/${userId}/workertasks/${taskId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${token}`
      }
    })
    .catch((err) => console.log(err));
  }

  return (
    tasks.map((task) => 
      <TaskCard 
        key = {task._id}
        id = {task._id}
        title = {task.title}
        description = {task.description}
        type = {task.type}
        setup = {task.setup}
        reward = {task.reward}
        expiry = {task.expiry}
        numberWorkers = {task.numberWorkers}
        master = {task.master}
        createdAt = {task.createdAt}
        onDelete = {onDelete}
      />
  ));
}

export default TaskList;
