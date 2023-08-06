import { Request, Response } from "express";
import { validationResult } from "express-validator";
import USER from "../models/user";
import s3FileManager from "../services/aws-s3";
import { v4 as uuidv4 } from "uuid";
import { ObjectId } from "mongodb";
import { incrementIdAndSave, getId } from "../services/fileManager";

const addCmp = async (req: Request, res: Response) => {
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   return res.status(400).json({ errors: errors.array() });
  // }

  const user = await USER.getById(new ObjectId(String(req.body._id)));
  if (!user) {
    return res.status(400).send("user not found");
  }

  const hid = uuidv4();
  const id = getId();

  console.log({ hid, id });

  const {
    username,
    password,
    aliases,
    thriveId,
    email,
    blackPageDomains,
    cmps,
  } = req.body;
};

export default addCmp;
