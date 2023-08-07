import { Request, Response } from "express";
import { validationResult } from "express-validator";
import USER from "../models/user";
import { ObjectId } from "mongodb";
import s3FileManager from "../services/aws-s3";

const getCmp = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { cmpId } = req.query;

  const file = await s3FileManager.getFile(cmpId);
  if (!file) {
    return res.status(400).send("file not found");
  } else {
    return res.status(200).json(file);
  }
};

export default getCmp;
