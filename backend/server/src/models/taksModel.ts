import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String, 
        required: true 
    },
    status: { 
        type: Boolean, 
        default: false
    },
    end_date: { 
        type: Date, 
        required: true 
    }
}, {
    timestamps: true
});

export const taskModel = mongoose.model("Task", taskSchema);