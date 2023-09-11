import { Request, Response } from "express";
import { validationResult } from "express-validator";
import CMP from "../../models/cmps";

export const bycmpId = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { cmpId } = req.query;
  const result = await CMP.findCmp(String(cmpId));
  return res.status(200).json(result);
};


