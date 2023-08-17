import express, { Request, Response } from "express";
import { UserController } from "./validation";
import addUser from "../controller/addUser";
import getUser from "../controller/getUser";
import getWhitePage from "../controller/getWhitePage";
import getBlackPages from "../controller/getBlackPages";
import login from "../controller/login";
import addCmp from "../controller/addCmp";
import getAvailableAliases from "../controller/getAvailableAliases";
import updateUser from "../controller/updateUser";
import updateCmp from "../controller/updateCmp";
import getCmp from "../controller/getCmp";
import getSnowData from "../controller/getSnowData";
import { config } from "dotenv";
import jwt from "jsonwebtoken";
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

router.post("/login", validate.login(), login);
router.get("/getUser", validateBearerToken, validate.getUser(), getUser);
router.post("/addUser", validateBearerToken, validate.addUser(), addUser);
router.put(
  "/updateUser",
  validateBearerToken,
  validate.updateUser(),
  updateUser
);

router.post("/addCmp", validateBearerToken, validate.addCmp(), addCmp);
router.put("/updateCmp", validateBearerToken, validate.updateCmp(), updateCmp);
router.get("/getCmp", validateBearerToken, validate.getCmp(), getCmp);

router.get(
  "/getAvailableAliases",
  validateBearerToken,
  validate.getAvailableAliases(),
  getAvailableAliases
);

router.get(
  "/snowData",
  validateBearerToken,
  validate.getSnowData(),
  getSnowData
);

router.get("/whitePage", validateBearerToken, getWhitePage);

// router.post("/addBlackPage", validate.checkRequestBody , addBlackPage);
// router.post("/deleteBlackPage", validate.checkRequestBody , addBlackPage);
// router.put("/updateBlackPage", validate.checkRequestBody , addBlackPage);
router.get(
  "/getBlackPages",
  validateBearerToken,
  validate.getBlackPages(),
  getBlackPages
);

// router.post("/addWhitePage", validate.checkRequestBody , addWhitePage);
// router.post("/deleteWhitePage", validate.checkRequestBody , addWhitePage);
// router.put("/updateWhitePage", validate.checkRequestBody , addWhitePage);
// router.get("/getWhitePage", validate.checkRequestBody , addWhitePage);

export default router;
