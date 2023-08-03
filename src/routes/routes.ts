import express, { Request, Response } from "express";
import { UserController } from "./validation";
import addUser from "../controller/addUser";

const router = express.Router();
const validate = new UserController();
router.get("/addUser", validate.checkRequestBody , addUser);

export default router;
