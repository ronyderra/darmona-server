import { Request, Response } from "express";
import { validationResult } from "express-validator";
import CMP from "../../models/cmps";
import { ObjectId } from "mongodb";

export const bycmpId = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { cmpId } = req.query;
  const result = await CMP.findCmp(String(cmpId));
  return res.status(200).json(result);
};
export const getCmpsByStatus = async (req: Request, res: Response) => {
  const { userId, status } = req.query;
  const result = await CMP.getCmpsByStatus(new ObjectId(String(userId)), String(status));
  return res.status(200).json(result);
};


