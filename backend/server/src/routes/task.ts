import express from "express";
import {
    getTasks,
    getTaskById,
    createTask,
    deleteTaskById,
    updateTaskById
} from '../controllers/taskController';

const taskRouter = express.Router();

taskRouter.get('/tasks', getTasks); 
taskRouter.get('/tasks/:id', getTaskById);
taskRouter.post('/tasks', createTask);
taskRouter.delete('/tasks/:id', deleteTaskById);
taskRouter.patch('/tasks/:id', updateTaskById);

export default taskRouter;