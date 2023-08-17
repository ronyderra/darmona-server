import { Request, Response } from "express";
import s3plfm from "../services/s3plfm";
import { validationResult } from "express-validator";

const getBlackPages = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { path } = req.query;

  const resp = await s3plfm.getAllFiles(path);
  if (resp) {
    console.log(resp);
    return res.status(200).json({ resp });
  } else {
    return res.status(400).json({ errors: "failed" });
  }
};

export default getBlackPages;
