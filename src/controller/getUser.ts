import { Request, Response } from "express";
import { validationResult } from "express-validator";
import USER from "../models/user";

const getUser = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { username, password } = req.query;
  const result = await USER.findUser(String(username), String(password));
  return res.status(200).json(result);
};

export default getUser;