import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import teacherRoutes from "./routes/teacher.routes.js";
import studentRoutes from "./routes/student.routes.js";

const localhost = process.env.LOCALHOST || "*";
// const deployedHost = process.env.DEPLOYEDHOST || "*";
const PORT = process.env.PORT || 3000;

dotenv.config();
const app = express();

app.use(cookieParser());

app.use(express.json());
const server = http.createServer(app);


const io = new Server(server, {
   cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
      credentials: true
   },
   // transports: ["websocket"],
});

app.set("io", io);
app.use(
   cors({
      origin: ["http://localhost:5173"],
      methods: ["GET", "POST", "PATCH", "DELETE"],
      allowedHeaders: ["Content-Type"],
   })
);
app.use("/teacher", teacherRoutes);
app.use("/student", studentRoutes);


const connectWithDB = async () => {
   await mongoose.connect(`${process.env.DATABASE_URL}`);
};

io.on("connection", (socket) => {
   console.log("Socket connected:", socket.id);
   const countConnections = io.engine.clientsCount

   io.emit('connected-users',countConnections)

   socket.on("recieve-question", (question) => {
      io.emit("recieve-question", question);
   });

   // socket.on("recieve-submission",(index)=>{
   //    newArr[index]
   // })

   socket.on("disconnect", () => {
      console.log("Socket disconnected:", socket.id);
   });
});

const startServer = async () => {
   try {
      await connectWithDB();
      server.listen(PORT, () => {
         console.log(`App is listenting to PORT ${PORT}`);
      });
   } catch (err) {
      console.log(err);
      process.exit(1);
   }
};

startServer();
