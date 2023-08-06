import { Request, Response } from "express";
import USER from "../models/user";
import s3FileManager from "../services/aws-s3";
import { v4 as uuidv4 } from "uuid";
import { ObjectId } from "mongodb";
import { incrementIdAndSave, getId } from "../services/fileManager";
import { FULL_CMP_JSON } from "../models/interfaces/cmpJson";
import { validationResult } from "express-validator";

const addCmp = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const user = await USER.getById(new ObjectId(String(req.body._id)));
  if (!user) {
    return res.status(400).send("user not found");
  }

  const hid = "testing";
  const id = await getId();
  try {
    const json: FULL_CMP_JSON = {
      id: Number(id),
      hid,
      imp: JSON.parse(req.body.imp),
      ctype: req.body.ctype,
      query: JSON.parse(req.body.query),
      alias: req.body.alias,
      ip: req.body.ip,
      track: req.body.track,
      dc_ep: req.body.dc_ep,
      query_map: JSON.parse(req.body.query_map),
      eps: JSON.parse(req.body.eps),
    };
    console.log({ json });
    const file = await s3FileManager.createFile("testing", json);
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
