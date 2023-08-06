import { Request, Response } from "express";
import USER from "../models/user";
import s3FileManager from "../services/aws-s3";
import { v4 as uuidv4 } from "uuid";
import { ObjectId } from "mongodb";
import { incrementIdAndSave, getId } from "../services/fileManager";
import { FULL_CMP_JSON } from "../models/interfaces/cmpJson";
import { validationResult } from "express-validator";

const addCmp = async (req: any, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const user = await USER.getById(new ObjectId(req.body._id));
  if (!user) {
    return res.status(400).send("user not found");
  }

  const { imp, ctype, query, alias, ip, track, dc_ep, query_map, eps } =
    req.body;

  let errorMsg = "";
  switch (true) {
    case !imp.count || Number(imp.count) < 1:
      errorMsg = "imppression count must be larger than 0";
      break;
    case !imp.recurring || imp.recurring !== true:
      errorMsg = "recurring must be true";
      break;
    case ctype !== "url":
      errorMsg = "ctype must be url";
      break;
    case ip !== true:
      errorMsg = "ip must be true";
      break;
    case track !== true:
      errorMsg = "track must be true";
      break;
    default:
      break;
  }
  if (errorMsg) {
    return res.status(404).send(errorMsg);
  }

  const hid = uuidv4();
  const id = await getId();
  try {
    const json: FULL_CMP_JSON = {
      id: Number(id),
      hid,
      imp: req.body.imp,
      ctype: req.body.ctype,
      query: req.body.query,
      alias: req.body.alias,
      ip: req.body.ip,
      track: req.body.track,
      dc_ep: req.body.dc_ep,
      query_map: req.body.query_map,
      eps: req.body.eps,
    };

    const file = await s3FileManager.createFile(hid, json);
    if (file) {
      await incrementIdAndSave();
      user.cmps.push({
        name: req.body.name,
        url: `https://${req.body.alias}/?cmp=${hid}`,
      });
      const updated = await USER.updateById(req.body._id, user);
      return res.status(200).json(updated);
    }
  } catch (error) {
    console.log(error.message);
    return res.status(404).json(error.message);
  }
};

export default addCmp;
