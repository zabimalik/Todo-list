import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './incom.css';

const completeTasks = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    axios.get('http://localhost:5000/complete')
      .then(res => setTasks(res.data))
      .catch(err => console.error(err));
  };


  const handleDelete = (taskId) => {
    axios.delete(`http://localhost:5000/${taskId}`)
      .then(res => {
        console.log(res.data);
        // Optionally, update state or re-fetch tasks to reflect changes
        fetchTasks();
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="incomplete-tasks">
    <h2>Completed Tasks</h2>
    {tasks.map(task => (
      <div key={task._id} className="task-item">
        <h3>{task.title}</h3>
        <p>{task.description}</p>
        <p>Status: {task.status}</p>
        <div className="button-group">
          <button className="delete-button" onClick={() => handleDelete(task._id)}>Delete</button>
        </div>
      </div>
    ))}
  </div>
  );
};

export default completeTasks;
