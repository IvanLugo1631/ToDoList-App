import { useState, useEffect } from "react";
import axios from "axios";
import Tasks from "./components/tasks";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newDate, setNewDate] = useState('');

  // Fetch tasks on mount
  useEffect(() => {
    const getTasks = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/tasks`);
        setTasks(res.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    getTasks();
  }, []);

  const handleTaskDone = (id) => {
    console.log(`Task ${id} is marked as done`);
  };

  const handleTaskDelete = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_BASE_URL}/api/v1/tasks/${id}`);
      setTasks((prevTasks) => prevTasks.filter(task => task._id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleTaskUpdate = async (id, updatedData) => {
    try {
      const res = await axios.patch(`${process.env.REACT_APP_BASE_URL}/api/v1/tasks/${id}`, updatedData);
      setTasks((prevTasks) => 
        prevTasks.map(task => (task._id === id ? res.data : task))
      );
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  // Add new task
  const handleAddTask = async () => {
    const newTask = {
      title: newTitle,
      description: newDescription,
      end_date: newDate,
    };
    try {
      const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/tasks`, newTask);
      setTasks((prevTasks) => [...prevTasks, res.data]);
      setNewTitle('');
      setNewDescription('');
      setNewDate('');
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <div className="App">
      <div className="container">
        <h1>TO DO LIST APP</h1>
        <div className="top-wrapper">
          <div className="top-title">
            <label className="custom-label">Title</label>
            <input 
              type="text" 
              placeholder="Title" 
              value={newTitle} 
              onChange={(e) => setNewTitle(e.target.value)} 
            />
          </div>
          <div className="top-description">
          <label className="custom-label">Description</label>
            <input 
              type="text" 
              placeholder="Description" 
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)} 
            />
          </div>
          <div className="top-date">
          <label className="custom-label">Date</label>
            <input 
              type="date" 
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)} 
            />
          </div>
          <div className="add">
            <button 
              type="button" 
              className="primaryBtn"
              onClick={handleAddTask}
            >
              ADD
            </button>
          </div>
        </div>

        <Tasks 
          tasks={tasks} 
          onTaskDone={handleTaskDone} 
          onTaskDelete={handleTaskDelete} 
          onTaskUpdate={handleTaskUpdate} 
        />
      </div>
    </div>
  );
}

export default App;
