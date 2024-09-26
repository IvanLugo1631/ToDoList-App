import { taskModel } from "../models/taksModel"; 


// Get all tasks
export const getTasks = async (req, res) => {
    try {
        const tasks = await taskModel.find();
        res.status(200).json(tasks);
    } catch (err) {
        res.status(500).json({ message: "Error retrieving tasks", error: err.message });
    }
};

// Get a task by ID
export const getTaskById = async (req, res) => {
    try {
        const task = await taskModel.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json(task);
    } catch (err) {
        res.status(500).json({ message: "Error retrieving task", error: err.message });
    }
};

// Create a new task
export const createTask = async (req, res) => {
    try {
        const newTask = new taskModel(req.body);
        const savedTask = await newTask.save();
        res.status(201).json({ message: "Task created successfully", task: savedTask });
    } catch (err) {
        res.status(400).json({ message: "Error creating task", error: err.message });
    }
};

// Delete a task by ID
export const deleteTaskById = async (req, res) => {
    try {
        const result = await taskModel.findByIdAndDelete(req.params.id);
        if (!result) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json({ message: "Task deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Error deleting task", error: err.message });
    }
};

// Update a task by ID
export const updateTaskById = async (req, res) => {
    try {
        const updatedTask = await taskModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedTask) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json({ message: "Task updated successfully", task: updatedTask });
    } catch (err) {
        res.status(400).json({ message: "Error updating task", error: err.message });
    }
};
