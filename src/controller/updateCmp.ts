import { Request, Response } from "express";
import { validationResult } from "express-validator";
import USER from "../models/user";
import { IUSER, IUSERDocument } from "../models/interfaces/user";
import s3FileManager from "../services/aws-s3";
import CMP from "../models/cmps";
import { ObjectId } from "mongodb";

const updateCmp = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  let userToUpdate: IUSERDocument | undefined = await USER.getById(req.body._id);
  if (!userToUpdate) {
    return res.status(400).send("user not found");
  }

  const userCmps = await CMP.getCmpsByUser(new ObjectId(req.body._id));
  const cmp = userCmps?.find(i => i.cmpId === req.body.url);
  if (!cmp) {
    return res.status(400).send("campaign not found");
  }

  if (req.body.name) {
    cmp.cmpName = req.body.name;
    await CMP.updateById(cmp._id, cmp);
  }
  if (req.body.status) {
    cmp.status = req.body.status;
    await CMP.updateById(cmp._id, cmp);
  }

  const file = await s3FileManager.getFile(cmp.cmpId);
  if (!file) {
    return res.status(400).send("file not found");
  }

  if (req.body.imp) {
    file.imp = req.body.imp;
  }
  if (req.body.ctype) {
    file.ctype = req.body.ctype;
  }
  if (req.body.query) {
    file.query = req.body.query;
  }
  if (req.body.alias) {
    file.alias = req.body.alias;
  }
  if (req.body.ip) {
    file.ip = req.body.ip;
  }
  if (req.body.track) {
    file.track = req.body.track;
  }
  if (req.body.dc_ep) {
    file.dc_ep = decodeURI(req.body.dc_ep);
    if (req.body.dc_ep?.includes(".html")) {
      console.log("got here");
      file.is_tpl = true;
    } else {
      file.is_tpl = false;
    }
  }
  if (req.body.eps) {
    file.eps = req.body.eps.map(i => {
      return {
        geo: i.geo,
        weight: i.weight,
        ep: decodeURI(i.ep),
        is_tpl: decodeURI(i.ep).includes(".html") ? true : false
      };
    });
  }
  if (req.body.query) {
    file.query = req.body.query;
  }
  if (req.body.query_map) {
    file.query_map = req.body.query_map;
  }
  console.log(file);

  const resp = await s3FileManager.updateFile(cmp.cmpId, file);
  return res.status(200).json(resp);
};

export default updateCmp;
