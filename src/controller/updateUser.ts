import { Request, Response } from "express";
import { validationResult } from "express-validator";
import USER from "../models/user";
import { IUSER, IUSERDocument } from "../models/interfaces/user";

const updateUser = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const userToUpdate: IUSERDocument | undefined = await USER.getById(
    req.body._id
  );

  //validate that there is only 1 alias/blackPageDomains/cmps to push else loop it

  switch (true) {
    case req.body.username:
      userToUpdate.username = req.body.username;

    case req.body.password:
      userToUpdate.password = req.body.password;

    case req.body.aliases:
      userToUpdate.aliases.push(req.body.aliases);

    case req.body.thriveId:
      userToUpdate.thriveId = req.body.thriveId;

    case req.body.email:
      userToUpdate.email = req.body.email;

    case req.body.blackPageDomains:
      userToUpdate.blackPageDomains.push(req.body.blackPageDomains);

    case req.body.cmps:
      userToUpdate.cmps.push(req.body.cmps);

    case req.body.role:
      userToUpdate.role = req.body.role;

    default:
      break;
  }

  //   const result = await USER.findUser(String(username), String(password));
  //   return res.status(200).json(result);
};

export default updateUser;
