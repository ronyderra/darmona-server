import express from "express";
import cors from "cors";
import { config } from "dotenv";
import http from "http";
import router from "./routes/routes";
import mongoose from "mongoose";
import { route53Manager } from "./services/aws-route53";
import { acmManager } from "./services/aws-acm";
config();

const port = process.env.PORT || 3030;
const MongoUrl: string = process.env.MONGO_URL || "";

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(
  cors({
    credentials: true,
    origin: [
      "http://localhost:3000",
      "https://main.d3px52zhihmoye.amplifyapp.com/",
      "https://main.d3px52zhihmoye.amplifyapp.com",
      "https://dev.darmona.org",
      "https://dev.darmona.org/"
    ],
  })
);
app.use("/", router);

const server = http.createServer(app);
server.listen(port, async () => {
  console.log(`Server runs on port ${port}`);
  const array = [
    "zedeyame.com",
    "bca.zedeyame.com",
    "bge.zedeyame.com",
    "bit.zedeyame.com",
    "bmx.zedeyame.com",
    "trac.zedeyame.com",
    "tail.zedeyame.com",
    "seek.zedeyame.com",
    "hunt.zedeyame.com",
  ];
  // for (let index = 0; index < arr.length; index++) {
  //   const element = arr[index];
  //   await route53Manager.createRecordInHostedZone("zedeyame.com", element);
  // }

  acmManager.requestCertificateForDomains(array);
});

const options: any = { useNewUrlParser: true, useUnifiedTopology: true };
mongoose.set("strictQuery", true);
mongoose.connect(MongoUrl, options);
const connection = mongoose.connection;
connection.on("error", (err) => console.error("connection error: ", err));
connection.once("open", () => {
  console.log("connected to: ", connection.name);
});
