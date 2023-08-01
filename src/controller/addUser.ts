import { Request, Response } from 'express';
import USER from "../models/user";

//a function to add user (signature and message) to the DB
export const addUser = async (req: Request, res: Response) => {
  try {
    if (!req.body) {
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

    // validate user does not exist

    const result = await USER.createNew(req.body);
  } catch (e: any) {
    res.status(500).json({ message: e.toString() });
  }
};
