import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";
import USER from "../models/user";

const addUser = async (req: Request, res: Response, next: NextFunction) => {
  // Use express-validator to validate the request body
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  console.log("got here");
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
    // If any error occurs during the async operations, pass it to the global error handling middleware
    next(error);
  }
};

export default addUser;
