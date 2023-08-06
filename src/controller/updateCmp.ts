import { Request, Response } from "express";
import { validationResult } from "express-validator";
import USER from "../models/user";
import { IUSER, IUSERDocument } from "../models/interfaces/user";

const updateCmp = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  let userToUpdate: IUSERDocument | undefined = await USER.getById(
    req.body._id
  );

  //validate that there is only 1 alias/blackPageDomains/cmps to push else loop it
  if (req.body.username) {
    userToUpdate.username = req.body.username;
  }
  if (req.body.password) {
    userToUpdate.password = req.body.password;
  }
  if (req.body.aliases) {
    userToUpdate.aliases.push(req.body.aliases);
  }
  if (req.body.thriveId) {
    userToUpdate.thriveId = req.body.thriveId;
  }
  if (req.body.email) {
    userToUpdate.email = req.body.email;
  }
  if (req.body.blackPageDomains) {
    userToUpdate.blackPageDomains.push(req.body.blackPageDomains);
  }
  if (req.body.cmps) {
    userToUpdate.cmps.push(req.body.cmps);
  }
  if (req.body.role) {
    userToUpdate.role = req.body.role;
  }

  const result = await USER.updateById(req.body._id, userToUpdate);
  return res.status(200).json(result);
};

export default updateCmp;
