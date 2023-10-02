import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { ObjectId } from "mongodb";
import CMP from "../../models/cmps";

export const updateCmpDoc = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { cmpDocId, status } = req.body;
    if (status) {
      const result = await CMP.updateStatus(new ObjectId(String(cmpDocId)), status);
      console.log("updated cmp status", { result });
    }
    return res.status(200).send("Updated");
  } catch (error) {
    console.log(error.message);
    return res.status(400).send("failed");
  }
};
