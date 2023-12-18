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
import { getSnowData, getRows, countByDateAndParam, getTrkAnalytics } from "../controller/getSnowData";
import { config } from "dotenv";
import { validateBearerToken } from "./validation";
import { getBlackPagesV2, getGeos, getCharactersV2 } from "../controller/getBlackPagesV2";
import { uploadImg } from "../controller/uploadImg";
import { bycmpId, getCmpsByStatus } from "../controller/cmps/bycmpId";
import { handleNewPrelander } from "../controller/lambda/prelanders";
import { handleNewWhitePage } from "../controller/lambda/whitePages";
import { updateCmpDoc } from "../controller/cmps/updateCmpDoc";
import checkAvailability from "../controller/domainManager/checkAvailability";
import buyDomain from "../controller/domainManager/buyDomain";
import setNameservers from "../controller/domainManager/setNameservers";
config();

const router = express.Router();
const validate = new UserController();

router.put("/updateUser", validateBearerToken, validate.updateUser(), updateUser);
router.put("/updateCmp", validateBearerToken, validate.updateCmp(), updateCmp);
router.put("/updateCmpDoc", validateBearerToken, validate.updateCmpDoc(), updateCmpDoc);

router.post("/login", validate.login(), login);
router.post("/addUser", validateBearerToken, validate.addUser(), addUser);
router.post("/addCmp", validateBearerToken, validate.addCmp(), addCmp);
router.post("/uploadImg", validateBearerToken, uploadImg);

router.get("/addPrelander", handleNewPrelander);
router.get("/addWhitePage", handleNewWhitePage);
router.get("/getUser", validateBearerToken, validate.getUser(), getUser);
router.get("/getCmp", validateBearerToken, validate.getCmp(), getCmp);
router.get("/getAvailableAliases", validateBearerToken, validate.getAvailableAliases(), getAvailableAliases);
router.get("/snowData", validateBearerToken, validate.getSnowData(), getSnowData);
router.get("/countByDateAndParam", validateBearerToken, validate.countByDateAndParam(), countByDateAndParam);
router.get("/getrows", validateBearerToken, validate.getSnowData(), getRows);

router.post("/getTrkAnalytics", getTrkAnalytics);
router.get("/getTrkAnalyticsCmps", getCmpsByStatus);

router.get("/whitePage", validateBearerToken, getWhitePage);
router.get("/getWhitePageHtmlType", validateBearerToken, getWhitePageHtmlType);
router.get("/getBlackPages", validateBearerToken, validate.getBlackPages(), getBlackPages);
router.get("/getCharacters", validateBearerToken, validate.getBlackPages(), getCharacters);
router.get("/getBlackPagesV2", getBlackPagesV2);
router.get("/getGeos", getGeos);
router.get("/getCharactersV2", getCharactersV2);
router.get("/bycmpId", bycmpId);
// domain.com
router.get("/checkAvailability", validateBearerToken, validate.checkAvailability(), checkAvailability);
router.post("/buyDomain", validateBearerToken, validate.buyDomain(), buyDomain);
router.post("/setNameservers", validateBearerToken, validate.buyDomain(), setNameservers);

export default router;
