import express, { Request, Response } from "express";
import { UserController } from "./validation";
import addUser from "../controller/addUser";
var jwt = require("jsonwebtoken");

function validateBearerToken(req, res, next) {
  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ error: "Unauthorized - Bearer token not found" });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, "Pass", (err, decodedToken) => {
    if (err) {
      return res
        .status(401)
        .json({ error: "Unauthorized - Invalid bearer token" });
    }

    // The token is valid, you can optionally attach the decoded token to the request for future use
    req.decodedToken = decodedToken;
    next();
  });
}

const router = express.Router();
const validate = new UserController();

router.post("/addUser", validateBearerToken, validate.addUser(), addUser);
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
