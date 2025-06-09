import { io } from "socket.io-client";


export const socket = io(
  // "http://localhost:3000"
  "https://intervue-io-dev.vercel.app"
  , {
  withCredentials: true,
  transports: ["websocket"]
});