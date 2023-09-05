import { Request, Response } from "express";
import { validationResult } from "express-validator";
import BLACKPAGE from "../models/blackPage";

export const getBlackPagesV2 = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { version, geo, celeb } = req.query;

  const file = await BLACKPAGE.getBlackPage(
    String(version),
    String(geo),
    String(celeb)
  );
  if (!file) {
    return res.status(400).send("file not found");
  } else {
    return res.status(200).json(file);
  }
};

export const getGeos = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { version } = req.query;

  const file = await BLACKPAGE.getGeos(String(version));
  if (!file) {
    return res.status(400).send("file not found");
  } else {
    return res.status(200).json(file);
  }
};

export const getCharactersV2 = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { version, geo } = req.query;

  const file = await BLACKPAGE.getCharactersV2(String(version), String(geo));
  if (!file) {
    return res.status(400).send("file not found");
  } else {
    return res.status(200).json(file);
  }
};
