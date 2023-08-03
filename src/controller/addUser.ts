import { Request, Response } from "express";
import { validationResult } from "express-validator";
import USER from "../models/user";

const addUser = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    username,
    password,
    aliases,
    thriveId,
    email,
    blackPageDomains,
    cmps,
  } = req.body;

  try {
    // validate user does not exist (your validation logic here)

    const result = await USER.createNew(req.body);

    res.json(result);
  } catch (error) {
    console.log(error.message);
  }
};

export default addUser;
