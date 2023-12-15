import { Request, Response } from "express";
import snowManager from "../services/snow";
import { validationResult } from "express-validator";

export const getSnowData = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { from, to, cmp } = req.query;

  const resp = await snowManager.countSkipTraffic(from, to, cmp);
  console.log(resp);

  return res.status(200).json({ resp });
};

export const getRows = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { from, to, cmp } = req.query;

  const resp = await snowManager.getRows(from, to, cmp);
  if (resp.length > 100) {
    res.status(200).json({ resp: resp.slice(0, 100) });
    return;
  }
  // console.log(resp);

  return res.status(200).json({ resp });
};
export const countByDateAndParam = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { from, to, by, sort } = req.query;
  const resp = await snowManager.countByDateAndParam(from, to, by, sort);
  // console.log(resp);
  return res.status(200).json({ resp });
};
