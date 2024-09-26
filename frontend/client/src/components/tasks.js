import React, { useState } from 'react';

const Tasks = ({ tasks, onTaskDone, onTaskDelete, onTaskUpdate }) => {
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [updatedTitle, setUpdatedTitle] = useState('');
  const [updatedDescription, setUpdatedDescription] = useState('');
  const [updatedEndDate, setUpdatedEndDate] = useState('');

  // Mark a task as done and update its status to true
  const handleTaskDone = (id) => {
    const updatedTask = tasks.find(task => task._id === id);
    if (updatedTask) {
      onTaskUpdate(id, { ...updatedTask, status: true }); // Update the status to true
    }
    onTaskDone(id);
  };

  // Delete a task
  const handleDelete = (id) => {
    onTaskDelete(id);
  };

  // Start editing a task by setting current values
  const handleUpdateStart = (task) => {
    setEditingTaskId(task._id);
    setUpdatedTitle(task.title);
    setUpdatedDescription(task.description);

    // Ensure the end date is a valid date before setting it
    if (task.end_date && !isNaN(new Date(task.end_date))) {
      setUpdatedEndDate(new Date(task.end_date).toISOString().substring(0, 10));
    } else {
      setUpdatedEndDate('');
    }
  };

  // Save the updated task and reset editing state
  const handleUpdateSave = (id) => {
    onTaskUpdate(id, { 
      title: updatedTitle, 
      description: updatedDescription, 
      end_date: updatedEndDate
    });
    setEditingTaskId(null);
  };

  return (
    <div className="list">
      {tasks.length > 0 ? (
        <ul>
          {tasks.map(task => (
            <li 
              key={task._id} 
              className="task-item" 
              style={{ backgroundColor: task.status ? '#fff9c4' : 'white' }} // Highlight if task is done
            >
              {editingTaskId === task._id ? (
                <div>
                  <input
                    type="text"
                    value={updatedTitle}
                    onChange={(e) => setUpdatedTitle(e.target.value)}
                    placeholder="Title"
                  />
                  <input
                    type="text"
                    value={updatedDescription}
                    onChange={(e) => setUpdatedDescription(e.target.value)}
                    placeholder="Description"
                  />
                  <input
                    type="date"
                    value={updatedEndDate}
                    onChange={(e) => setUpdatedEndDate(e.target.value)}
                  />
                  <button onClick={() => handleUpdateSave(task._id)}>Save</button>
                  <button onClick={() => setEditingTaskId(null)}>Cancel</button>
                </div>
              ) : (
                <div>
                  <h3 className="task-title">{task.title}</h3>
                  <p className="task-description">{task.description}</p>
                  <p className="task-date">
                    {task.end_date ? new Date(task.end_date).toLocaleDateString() : 'No End Date'}
                  </p>
                  <div className="task-buttons">
                    {!task.status && (
                      <button className="done-btn" onClick={() => handleTaskDone(task._id)}>
                        Mark as Done
                      </button>
                    )}
                    <button className="update-btn" onClick={() => handleUpdateStart(task)}>
                      Update
                    </button>
                    <button className="delete-btn" onClick={() => handleDelete(task._id)}>
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No tasks available</p>
      )}
    </div>
  );
};

export default Tasks;
