import { Request, Response } from "express";
import { validationResult } from "express-validator";
import USER from "../models/user";
import { IUSER, IUSERDocument } from "../models/interfaces/user";
import s3FileManager from "../services/aws-s3";

const updateCmp = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  let userToUpdate: IUSERDocument | undefined = await USER.getById(req.body._id);
  if (!userToUpdate) {
    return res.status(400).send("user not found");
  }

  const cmp = userToUpdate.cmps.find((i) => i.url === req.body.url);
  if (!cmp) {
    return res.status(400).send("campaign not found");
  }

  if (req.body.name) {
    cmp.name = req.body.name;
  }

  const url = new URL(cmp.url);
  const parameters = new URLSearchParams(url.search);
  const cmpId = parameters.get("cmp");
  if (!cmpId) {
    return res.status(400).send("cmp id not found");
  }

  const file = await s3FileManager.getFile(cmpId);
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
    file.dc_ep = req.body.dc_ep;
  }
  if (req.body.query_map) {
    file.query_map = req.body.query_map;
  }
  if (req.body.eps) {
    file.eps = req.body.eps;
  }


};

export default updateCmp;
