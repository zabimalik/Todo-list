import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './incom.css';

const IncompleteTasks = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    axios.get('http://localhost:5000/incomplete')
      .then(res => setTasks(res.data))
      .catch(err => console.error(err));
  };

  const handleComplete = (taskId) => {
    axios.patch(`http://localhost:5000/complete/${taskId}`)
      .then(res => {
        console.log(res.data);
        // Optionally, update state or re-fetch tasks to reflect changes
        fetchTasks();
      })
      .catch(err => console.error(err));
  };

 

  return (
    <div className="incomplete-tasks">
    <h2>Incomplete Tasks</h2>
    {tasks.map(task => (
      <div key={task._id} className="task-item">
        <h3>{task.title}</h3>
        <p>{task.description}</p>
        <p>Status: {task.status}</p>
        <div className="button-group">
          <button className="complete-button" onClick={() => handleComplete(task._id)}>Mark as Completed</button>
          
        </div>
      </div>
    ))}
  </div>
  );
};

export default IncompleteTasks;
