import { Request, Response } from "express";
import s3plfm from "../services/s3plfm";
import { validationResult } from "express-validator";
import { config } from "dotenv";
import login from "./login";
config();

export const getBlackPages = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { path, bucketName } = req.query;
  let resp;
  
  if (bucketName !== "") {
    console.log("got herte");
    resp = await s3plfm.getAllFiles(path, String(bucketName));
   
    
  } else {
    resp = await s3plfm.getAllFiles(path);
  }


  const data = resp?.CommonPrefixes?.map((i) => i.Prefix);
  if (data) {
    return res.status(200).json({ data });
  } else {
    return res.status(400).json({ errors: "failed" });
  }
};

export const getCharacters = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { path } = req.query;
  const resp = await s3plfm.getAllFiles(path, process.env.ASSETS_BUCKET);
  const data =
    resp?.Contents.length > 0
      ? resp?.Contents?.map((i) => i.Key)
      : resp.CommonPrefixes.map((i) => i.Prefix);
  if (data) {
    return res.status(200).json({ data });
  } else {
    return res.status(400).json({ errors: "failed" });
  }
};
