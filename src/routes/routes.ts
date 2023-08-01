import express, { Request, Response } from "express";
import addUser from "../controller/addUser";

const router = express.Router();

router.get("/addUser", addUser);

export default router;
