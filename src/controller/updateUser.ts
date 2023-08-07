import { Request, Response } from "express";
import { validationResult } from "express-validator";
import USER from "../models/user";
import { IUSER, IUSERDocument } from "../models/interfaces/user";

const updateUser = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  let userToUpdate: IUSERDocument | undefined = await USER.getById(
    req.body._id
  );

  //validate that there is only 1 alias/blackPageDomains/cmps to push else loop it
  if (req.body.data.username) {
    userToUpdate.username = req.body.data.username;
  }
  if (req.body.data.password) {
    userToUpdate.password = req.body.data.password;
  }
  if (req.body.data.alias) {
    userToUpdate.aliases.push(req.body.data.alias);
  }
  if (req.body.data.thriveId) {
    userToUpdate.thriveId = req.body.data.thriveId;
  }
  if (req.body.data.email) {
    userToUpdate.email = req.body.data.email;
  }
  if (req.body.data.blackPageDomain) {
    userToUpdate.blackPageDomains.push(req.body.data.blackPageDomain);
  }
  if (req.body.data.cmp) {
    userToUpdate.cmps.push(req.body.data.cmp);
  }
  if (req.body.data.role) {
    userToUpdate.role = req.body.data.role;
  }
  
  const result = await USER.updateById(req.body._id, userToUpdate);
  return res.status(200).json(result);
};

export default updateUser;
