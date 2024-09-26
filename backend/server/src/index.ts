import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import taskRouter from "./routes/task";

dotenv.config();

const app = express();

app.use(cors({
    origin: "http://localhost:3000 ",
    credentials: true
}));

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(8080, () => {
    console.log("Server running on http://localhost:8080")
})
app.use('/api/v1', taskRouter);

const mongoUser = process.env.MONGO_USERNAME;
const mongoPassword = process.env.MONGO_PASSWORD;

const mongoUrl = `mongodb+srv://${mongoUser}:${mongoPassword}@electron.9jeyf.mongodb.net/?retryWrites=true&w=majority&appName=Electron`


mongoose.connect(mongoUrl);

mongoose.connection.on("connected", () => {
    console.log("Mongoose connected to MongoDB");
});

mongoose.connection.on("error", (error: Error) => {
    console.log("Mongoose connection error:", error);
});

