import React, { useState, useEffect } from 'react';
import TaskCard from './TaskCard'

function TaskList() {

  const [tasks, setTasks] = useState([]);

  // Load cards on mount
  useEffect(() => {
    const token = localStorage.getItem('JWT');
    fetch('http://localhost:8080/requester/tasks', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${token}`
      }
    })
    .then(res => res.json())
    .then(res => setTasks(res))
    .catch((err) => console.log(err));
  }, [])

  return (
    tasks.map((task) => 
      <TaskCard 
        key = {task._id}
        title = {task.title}
        description = {task.description}
        reward = {task.reward}
        expiry = {task.expiry}
        createdAt = {task.createdAt}
      />
  ));
}

export default TaskList;
