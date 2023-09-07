import { Request, Response } from "express";
import s3plfm from "../services/s3plfm";
import { validationResult } from "express-validator";
import { config } from "dotenv";
config();

export const uploadImg = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { key, base64Image, bucketName } = req.body;
  const data = await s3plfm.uploadImage(key, base64Image, bucketName);
  console.log({ data });

  if (data) {
    return res.status(200).json({ data });
  } else {
    return res.status(400).json({ errors: "failed" });
  }
};
