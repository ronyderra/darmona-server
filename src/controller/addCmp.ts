import { Request, Response } from "express";
import USER from "../models/user";
import s3FileManager from "../services/aws-s3";
import { v4 as uuidv4 } from "uuid";
import { ObjectId } from "mongodb";
import { incrementIdAndSave, getId } from "../services/fileManager";
import { FULL_CMP_JSON } from "../models/interfaces/cmpJson";

const addCmp = async (req: Request, res: Response) => {
  const user = await USER.getById(new ObjectId(String(req.body._id)));
  if (!user) {
    return res.status(400).send("user not found");
  }

  const hid = uuidv4();
  const id = await getId();

  const json: FULL_CMP_JSON = {
    id: String(id),
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
  console.log({ json });
  const file = s3FileManager.createFile(hid, json);
  if (file) {
    await incrementIdAndSave();
    user.cmps.push({
      name: req.body.name,
      url: `https://${req.body.alias}/?cmp=${hid}`,
    });
    const updated = await USER.updateById(req.body._id, user);
    return res.status(200).json(updated);
  }
};

export default addCmp;
