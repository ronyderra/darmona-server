import express, { Request, Response } from "express";
import { UserController } from "./validation";
import addUser from "../controller/addUser";
import getUser from "../controller/getUser";
import login from "../controller/login";
import addCmp from "../controller/addCmp";
import updateUser from "../controller/updateUser";
import updateCmp from "../controller/updateCmp";
import { config } from "dotenv";
import jwt from 'jsonwebtoken';
config();

function validateBearerToken(req, res, next) {
  const authHeader = req.headers["authorization"];
 
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.log("got here")
    return res
      .status(401)
      .json({ error: "Unauthorized - Bearer token not found" });
  }
  const token = authHeader.split(" ")[1];
  jwt.verify(token, "password", (err, decodedToken) => {
    if (err) {
      return res
        .status(401)
        .json({ error: "Unauthorized - Invalid bearer token" });
    }
    req.decodedToken = decodedToken;
    next();
  });
}

const router = express.Router();
const validate = new UserController();

router.post("/login", validate.login(), login);
router.get("/getUser", validateBearerToken, validate.getUser(), getUser);
router.post("/addUser", validateBearerToken, validate.addUser(), addUser);
router.put("/updateUser", validateBearerToken, validate.updateUser(), updateUser);

router.post("/addCmp", validateBearerToken, validate.addCmp(), addCmp);
router.put("/updateCmp", validateBearerToken, validate.updateCmp(), updateCmp);


// router.post("/addBlackPage", validate.checkRequestBody , addBlackPage);
// router.post("/deleteBlackPage", validate.checkRequestBody , addBlackPage);
// router.put("/updateBlackPage", validate.checkRequestBody , addBlackPage);
// router.get("/getBlackPage", validate.checkRequestBody , addBlackPage);

// router.post("/addWhitePage", validate.checkRequestBody , addWhitePage);
// router.post("/deleteWhitePage", validate.checkRequestBody , addWhitePage);
// router.put("/updateWhitePage", validate.checkRequestBody , addWhitePage);
// router.get("/getWhitePage", validate.checkRequestBody , addWhitePage);

export default router;
