import { Request, Response } from "express";
import snowManager from "../services/snow";
import { validationResult } from "express-validator";

const getSnowData = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { from, to, cmp } = req.query;

  const resp = await snowManager.executeSnow(from, to, cmp);
  console.log(resp);

  return res.status(200).json({ resp });
};

export default getSnowData;
