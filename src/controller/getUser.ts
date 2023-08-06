import { Request, Response } from "express";
import { validationResult } from "express-validator";
import USER from "../models/user";
import { ObjectId } from "mongodb";

const getUser = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { _id } = req.query;
  const result = await USER.getById(new ObjectId(String(_id)));
  return res.status(200).json(result);
};


export default getUser;
