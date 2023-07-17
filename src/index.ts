import express from "express";
import cors from "cors";
import { config } from "dotenv";
import { Server } from "socket.io";
import http from "http";
import router from "./routes/routes";
config();

const port = process.env.PORT || 3030;

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());
app.use("/", router);

export const server = http.createServer(app);

export const clientAppSocket = new Server(server, {
  cors: {
    origin: "*",
  },
});

clientAppSocket.setMaxListeners(0)
clientAppSocket.on("connection", (socket) => {
  // console.log("a user connected to ", socket.id);
  // clientAppSocket.emit("updateAchievment", socket.id)
});

export default server.listen(port, () => {
  console.log(`Server runs on port ${port}`);
});