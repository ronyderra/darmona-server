import { Request, Response } from "express";
import { validationResult } from "express-validator";
import USER from "../models/user";
import { IUSER  ,IUSERDocument} from "../models/interfaces/user";

const updateUser = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  // const userToUpdate: IUSERDocument | undefined = USER.getById(req.body._id);

  // switch (true) {
  //   case req.body.username:
  //     userToUpdate.username = req.body.username;
  //     break;
  //   case req.body.password:
  //     userToUpdate.username = req.body.password;
  //     break;
  //   case req.body.aliases:
  //     userToUpdate.username = req.body.aliases;
  //     break;
  //   case req.body.thriveId:
  //     userToUpdate.username = req.body.thriveId;
  //     break;
  //   case req.body.email:
  //     userToUpdate.username = req.body.email;
  //     break;
  //   case req.body.blackPageDomains:
  //     userToUpdate.username = req.body.blackPageDomains;
  //     break;
  //   case req.body.cmps:
  //     userToUpdate.username = req.body.cmps;
  //     break;
  //   case req.body.role:
  //     userToUpdate.username = req.body.role;
  //     break;

  //   default:
  //     break;
  // }

  //   const result = await USER.findUser(String(username), String(password));
  //   return res.status(200).json(result);
};

export default updateUser;
