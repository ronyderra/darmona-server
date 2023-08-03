import express, { Request, Response } from "express";
import { UserController } from "./validation";
import addUser from "../controller/addUser";
import { config } from "dotenv";
import jwt from 'jsonwebtoken';
config();

function validateBearerToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ error: "Unauthorized - Bearer token not found" });
  }
  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.BEARER, (err, decodedToken) => {
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

router.post("/addUser", validateBearerToken, validate.addUser(), addUser);
router.post("/deleteUser", validateBearerToken, validate.addUser(), addUser);
router.put("/updateUser", validateBearerToken, validate.addUser(), addUser);
router.get("/getUser", validateBearerToken, validate.addUser(), addUser);

// router.post("/addBlackPage", validate.checkRequestBody , addBlackPage);
// router.post("/deleteBlackPage", validate.checkRequestBody , addBlackPage);
// router.put("/updateBlackPage", validate.checkRequestBody , addBlackPage);
// router.get("/getBlackPage", validate.checkRequestBody , addBlackPage);

// router.post("/addWhitePage", validate.checkRequestBody , addWhitePage);
// router.post("/deleteWhitePage", validate.checkRequestBody , addWhitePage);
// router.put("/updateWhitePage", validate.checkRequestBody , addWhitePage);
// router.get("/getWhitePage", validate.checkRequestBody , addWhitePage);

export default router;
