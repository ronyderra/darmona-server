import { Request, Response } from "express";
import { validationResult } from "express-validator";
import USER from "../models/user";
import CMP from "../models/cmps";
import { ObjectId } from "mongodb";
import s3FileManager from "../services/aws-s3";
import { IUSERDocument } from "../models/interfaces/user";

const updateCmp = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // get user
    const userId = new ObjectId(req.body._id);
    const userToUpdate: IUSERDocument | null = await USER.getById(userId);
    if (!userToUpdate) {
      return res.status(404).send("User not found");
    }

    // get cmp
    const userCmps = await CMP.getCmpsByUser(userId);
    const cmp = userCmps?.find(i => i.cmpId === req.body.url);
    if (!cmp) {
      return res.status(404).send("Campaign not found");
    }

    // Update mongo
    const updateFields = ['cmpName', 'status', 'dc_ep_name', 'dc_ep', 'platformName', "eps"];
    updateFields.forEach(field => {
      if (field in req.body) {
        if (field === "eps") {
          cmp[field] = req.body[field].map(i => ({
            geo: i.geo,
            weight: Number(i.weight),
            epName: decodeURI(i.epName),
            ep: decodeURI(i.ep),
            is_tpl: decodeURI(i.ep).includes(".html")
          }));
        } else {
          cmp[field] = decodeURI(req.body[field]);
        }

      }
    });
    await CMP.updateById(cmp._id, cmp);

    // get json
    const file = await s3FileManager.getFile(cmp.cmpId);
    if (!file) {
      return res.status(404).send("File not found");
    }

    // Update s3
    const fileFields = ['imp', 'query', 'query_map', 'alias', 'platformName', 'dc_ep_name', 'eps', "dc_ep"];
    fileFields.forEach(field => {
      if (field in req.body) {
        if (field === 'eps') {
          file.eps = req.body[field].map(i => ({
            geo: i.geo,
            weight: Number(i.weight),
            epName: decodeURI(i.epName),
            ep: decodeURI(i.ep),
            is_tpl: decodeURI(i.ep).includes(".html")
          }));
        } else if (field === "imp" || field === "query" || field === "query_map") {
          file[field] = req.body[field];
        } else {
          file[field] = req.body[field];
        }
      }
    });
    const resp = await s3FileManager.updateFile(cmp.cmpId, file);
    return res.status(200).json(resp);
  } catch (error) {
    console.error(error);
    return res.status(500).send('Internal Server Error');
  }
};

export default updateCmp;
