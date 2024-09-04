import React, { useState } from 'react';
import axios from 'axios';
import './TaskForm.css'; // Import CSS file for TaskForm component

const TaskForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('incomplete'); // Default status

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/', { title, description, status })
      .then(res => {
        console.log(res.data);
        alert("Task added successfully")
        // Optionally, clear the form and trigger a re-fetch or update the state to reflect changes
        setTitle('');
        setDescription('');
        setStatus('incomplete'); // Reset status to default
      })
      .catch(err => console.error(err));
     
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h2>Add New Task</h2>
      <div className="form-group">
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="incomplete">Incomplete</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
