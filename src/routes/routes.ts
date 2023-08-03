import express, { Request, Response } from "express";
import { UserController } from "./validation";
import addUser from "../controller/addUser";

const router = express.Router();
const validate = new UserController();

router.post("/addUser", validate.addUser(), addUser);
router.post("/deleteUser", validate.checkRequestBody, addUser);
router.put("/updateUser", validate.checkRequestBody, addUser);
router.get("/getUser", validate.checkRequestBody, addUser);

// router.post("/addBlackPage", validate.checkRequestBody , addBlackPage);
// router.post("/deleteBlackPage", validate.checkRequestBody , addBlackPage);
// router.put("/updateBlackPage", validate.checkRequestBody , addBlackPage);
// router.get("/getBlackPage", validate.checkRequestBody , addBlackPage);

// router.post("/addWhitePage", validate.checkRequestBody , addWhitePage);
// router.post("/deleteWhitePage", validate.checkRequestBody , addWhitePage);
// router.put("/updateWhitePage", validate.checkRequestBody , addWhitePage);
// router.get("/getWhitePage", validate.checkRequestBody , addWhitePage);

export default router;
