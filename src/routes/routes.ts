import express, { Request, Response } from "express";
import { UserController } from "./validation";
import addUser from "../controller/addUser";
import getUser from "../controller/getUser";
import { getWhitePage, getWhitePageHtmlType } from "../controller/getWhitePage";
import { getBlackPages, getCharacters } from "../controller/getBlackPages";
import login from "../controller/login";
import addCmp from "../controller/addCmp";
import getAvailableAliases from "../controller/getAvailableAliases";
import updateUser from "../controller/updateUser";
import updateCmp from "../controller/updateCmp";
import getCmp from "../controller/getCmp";
import { getSnowData, getRows, countByDateAndParam } from "../controller/getSnowData";
import { config } from "dotenv";
import jwt from "jsonwebtoken";
import { getBlackPagesV2, getGeos, getCharactersV2 } from "../controller/getBlackPagesV2";
import { uploadImg } from "../controller/uploadImg";
import { bycmpId } from "../controller/cmps/bycmpId";
import axios from "axios";
config();

function validateBearerToken(req, res, next) {
  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized - Bearer token not found" });
  }
  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.BEARER, (err, decodedToken) => {
    if (err) {
      return res.status(401).json({ error: "Unauthorized - Invalid bearer token" });
    }
    req.decodedToken = decodedToken;
    next();
  });
}

const router = express.Router();
const validate = new UserController();

router.put("/updateUser", validateBearerToken, validate.updateUser(), updateUser);
router.put("/updateCmp", validateBearerToken, validate.updateCmp(), updateCmp);

router.post("/login", validate.login(), login);
router.post("/addUser", validateBearerToken, validate.addUser(), addUser);
router.post("/addCmp", validateBearerToken, validate.addCmp(), addCmp);
router.post("/uploadImg", validateBearerToken, uploadImg);

const funti = async (req: Request, res: Response) => {
  console.log("got here!!!!!!!!!");
  const { geo, lang, temp } = req.query;
  console.log({ geo, lang, temp });
  try {
    await axios.get(
      `https://api.telegram.org/bot6366420776:AAGMb3lUbdR20LVFhVXlVqRQJkKgk1G0fx8/sendMessage?chat_id=-4014962239&text=geo: ${geo}%0Alang: ${lang}%0Atemplate: ${temp}%0A was updated or created`
    );
    return res.status(200).send("got here!!!!!!!!!");
  } catch (error) {
    console.log(error);
    return res.status(200).send("got here!!!!!!!!! - failed");
  }
};
router.post("/s3", funti);
router.get("/s3", funti);

router.get("/getUser", validateBearerToken, validate.getUser(), getUser);
router.get("/getCmp", validateBearerToken, validate.getCmp(), getCmp);
router.get("/getAvailableAliases", validateBearerToken, validate.getAvailableAliases(), getAvailableAliases);
router.get("/snowData", validateBearerToken, validate.getSnowData(), getSnowData);
router.get("/countByDateAndParam", validateBearerToken, validate.countByDateAndParam(), countByDateAndParam);
router.get("/getrows", validateBearerToken, validate.getSnowData(), getRows);
router.get("/whitePage", validateBearerToken, getWhitePage);
router.get("/getWhitePageHtmlType", validateBearerToken, getWhitePageHtmlType);
router.get("/getBlackPages", validateBearerToken, validate.getBlackPages(), getBlackPages);
router.get("/getCharacters", validateBearerToken, validate.getBlackPages(), getCharacters);
router.get("/getBlackPagesV2", getBlackPagesV2);
router.get("/getGeos", getGeos);
router.get("/getCharactersV2", getCharactersV2);
router.get("/bycmpId", bycmpId);

export default router;
