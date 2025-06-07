import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import teacherRoutes from "./routes/teacher.routes.js";
import studentRoutes from "./routes/student.routes.js";
import { getQuestion } from "./controllers/methods.controller.js";


dotenv.config();
const app = express();

app.use(cookieParser());

app.use(express.json());
const server = http.createServer(app);

const io = new Server(server, {
   cors: {
      origin: process.env.SERVER_URL,
      // origin: "http://localhost:3000",
      methods: ["GET", "POST"],
      credentials: true,
      allowedHeaders: ["Content-Type"],

   },
   // transports: ["websocket"],
});
app.set("io", io);
app.use(
   cors({
      origin: ["http://localhost:5173", process.env.FRONTEND_URL],
      methods: ["GET", "POST", "PATCH", "DELETE"],
      allowedHeaders: ["Content-Type"],
      credentials:true
   })
);
app.use("/teacher", teacherRoutes);
app.use("/student", studentRoutes);

const connectWithDB = async () => {
   await mongoose.connect(`${process.env.DATABASE_URL}`);
};

io.on("connection", (socket) => {
   console.log("Socket connected:", socket.id);
   // const countConnections = io.engine.clientsCount

   // io.emit('connected-users',countConnections)

   socket.on("recieve-question", (question, id) => {
      io.emit("recieve-question", question, id);
   });

   socket.on("join-result-room", (questionId) => {
      socket.join(`result-room-${questionId}`);
   });

   socket.on("leave-room", (questionId) => {
      socket.leave(`result-room-${questionId}`);
   });

   socket.on("fetch-question", async (questionId) => {
      try {
         const question = await getQuestion(questionId);
         if (question) socket.emit("send-question-data", question);
         else socket.emit("send-question-data", null);
      } catch (err) {
         console.error(err);
         socket.emit("send-question-data", null);
      }
   });

   socket.on("disconnect", () => {
      console.log("Socket disconnected:", socket.id);
   });
});

const startServer = async () => {
   try {
      await connectWithDB();
      server.listen(process.env.PORT, () => {
         console.log(`App is listenting to PORT ${process.env.PORT}`);
      });
   } catch (err) {
      console.log(err);
      process.exit(1);
   }
};

startServer();
