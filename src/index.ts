import express from "express";
import cors from "cors";
import { config } from "dotenv";
import { Server } from "socket.io";
import http from "http";
import router from "./routes/routes";
import s3FileManager from "./services/aws-s3";
import mongoose from "mongoose";
import bodyParser from 'body-parser';
config();

const port = process.env.PORT || 3030;
const MongoUrl: string = process.env.MONGO_URL || "";

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors({ credentials: true, origin: ["http://localhost:3000" ,"https://master.d7vuyvgacqzf1.amplifyapp.com" ] }));
app.use("/", router);

export const server = http.createServer(app);
export const clientAppSocket = new Server(server, {
  cors: {
    origin: "*",
  },
});

clientAppSocket.setMaxListeners(0);
clientAppSocket.on("connection", (socket) => {
  // console.log("a user connected to ", socket.id);
  // clientAppSocket.emit("updateAchievment", socket.id)
});

export default server.listen(port, async () => {
  console.log(`Server runs on port ${port}`);
});

const options: any = { useNewUrlParser: true, useUnifiedTopology: true };
mongoose.set("strictQuery", true);
mongoose.connect(MongoUrl, options);
const connection = mongoose.connection;
connection.on("error", (err) => console.error("connection error: ", err));
connection.once("open", () => {
  console.log("connected to: ", connection.name);
});
