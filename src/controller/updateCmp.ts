// import { Request, Response } from "express";
// import { validationResult } from "express-validator";
// import USER from "../models/user";
// import { IUSER, IUSERDocument } from "../models/interfaces/user";
// import s3FileManager from "../services/aws-s3";
// import CMP from "../models/cmps";
// import { ObjectId } from "mongodb";

// function extractUniqueGeos(data): any[] {
//   const allGeos = data.flatMap(item => item.geo.grp);
//   return Array.from(new Set(allGeos));
// }

// const updateCmp = async (req: Request, res: Response) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
//   }

//   let userToUpdate: IUSERDocument | undefined = await USER.getById(req.body._id);
//   if (!userToUpdate) {
//     return res.status(400).send("user not found");
//   }

//   const userCmps = await CMP.getCmpsByUser(new ObjectId(req.body._id));
//   const cmp = userCmps?.find(i => i.cmpId === req.body.url);
//   if (!cmp) {
//     return res.status(400).send("campaign not found");
//   }

//   if (req.body.name) {
//     cmp.cmpName = req.body.name;
//     await CMP.updateById(cmp._id, cmp);
//   }
//   if (req.body.status) {
//     cmp.status = req.body.status;
//     await CMP.updateById(cmp._id, cmp);
//   }

//   const file = await s3FileManager.getFile(cmp.cmpId);
//   if (!file) {
//     return res.status(400).send("file not found");
//   }

//   if (req.body.imp) {
//     file.imp = req.body.imp;
//   }
//   if (req.body.ctype) {
//     file.ctype = req.body.ctype;
//   }
//   if (req.body.query) {
//     file.query = req.body.query;
//   }
//   if (req.body.alias) {
//     file.alias = req.body.alias;
//   }
//   if (req.body.whitePageName) {
//     file.dc_ep_name = req.body.whitePageName;
//     cmp.wpName = req.body.whitePageName;
//     await CMP.updateById(cmp._id, cmp);
//   }
//   if (req.body.platformName) {
//     file.platformName = req.body.platformName;
//     cmp.platformName = req.body.platformName;
//     await CMP.updateById(cmp._id, cmp);
//   }
//   if (req.body.ip) {
//     file.ip = req.body.ip;
//   }
//   if (req.body.track) {
//     file.track = req.body.track;
//   }
//   if (req.body.dc_ep) {
//     cmp.wpPath = decodeURI(req.body.dc_ep);
//     await CMP.updateById(cmp._id, cmp);

//     file.dc_ep = decodeURI(req.body.dc_ep);
//     if (req.body.dc_ep?.includes(".html")) {
//       console.log("got here");
//       file.is_tpl = true;
//     } else {
//       file.is_tpl = false;
//     }
//   }
//   if (req.body.eps) {
//     cmp.eps = req.body.eps;
//     await CMP.updateById(cmp._id, cmp);

//     file.eps = req.body.eps.map(i => {
//       return {
//         geo: i.geo,
//         weight: Number(i.weight),
//         epName: i?.epName,
//         ep: decodeURI(i.ep),
//         is_tpl: decodeURI(i.ep).includes(".html") ? true : false
//       };
//     });
//     const gs = extractUniqueGeos(req.body.eps)
//     cmp.geo = gs;
//     await CMP.updateById(cmp._id, cmp);
//   }
//   if (req.body.query) {
//     file.query = req.body.query;
//   }
//   if (req.body.query_map) {
//     file.query_map = req.body.query_map;
//   }

//   const resp = await s3FileManager.updateFile(cmp.cmpId, file);
//   return res.status(200).json(resp);
// };

// export default updateCmp;

import { Request, Response } from "express";
import { validationResult } from "express-validator";
import USER from "../models/user";
import CMP from "../models/cmps";
import { ObjectId } from "mongodb";
import s3FileManager from "../services/aws-s3";
import { IUSERDocument } from "../models/interfaces/user";

function extractUniqueGeos(data: any[]): string[] {
  const allGeos = data.flatMap(item => item.geo.grp);
  return Array.from(new Set(allGeos));
}

const updateCmp = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const userId = new ObjectId(req.body._id);
    const userToUpdate: IUSERDocument | null = await USER.getById(userId);
    if (!userToUpdate) {
      return res.status(404).send("User not found");
    }

    const userCmps = await CMP.getCmpsByUser(userId);
    const cmp = userCmps?.find(i => i.cmpId === req.body.url);
    if (!cmp) {
      return res.status(404).send("Campaign not found");
    }

    // Update mongo details
    const updateFields = ['name', 'status', 'dc_ep_name', 'dc_ep', 'platformName', "eps"];
    updateFields.forEach(field => {
      if (field in req.body) {
        if (cmp[field] === "eps") {
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

    // Update file details
    const file = await s3FileManager.getFile(cmp.cmpId);
    if (!file) {
      return res.status(404).send("File not found");
    }

    // Update s3 details
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
        } else {
          file[field] = decodeURI(req.body[field]);
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
