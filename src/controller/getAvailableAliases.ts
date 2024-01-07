import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { route53Manager } from "../services/aws-route53";
import USER from "../models/user";
import { ObjectId } from "mongodb";
import CMP, { ICMP } from "../models/cmps";

function filterItemsNotInArray(a, b) {
  const result = [];
  for (const aItem of a) {
    const existsInB = b.some(bItem => {
      return bItem === aItem;
    });
    if (!existsInB) {
      result.push(aItem);
    }
  }
  return result;
}

const getAvailableAliases = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { _id, domain } = req.query;
    const userCmps = await CMP.getCmpsByUser(new ObjectId(String(_id)));
    const user = await USER.getById(new ObjectId(String(_id)))
    console.log(domain);

    if (domain === "*") {
      const availableRootDomains = filterItemsNotInArray(user.aliases, userCmps.map(i => i.domain));
      console.log(availableRootDomains);
      return res.status(200).json(availableRootDomains);
    }

    const userRecords = userCmps.map(i => i.domain).filter(i => i.includes(String(domain)));

    const allRecords = await route53Manager.getAllRecordsInHostedZone(domain);
    if (!allRecords) {
      return res.status(400).send("records not found");
    }

    const aRecords = allRecords?.ResourceRecordSets.filter((i: any) => i?.Type === "A").map((i: any) => i?.Name.slice(0, -1));
    if (!aRecords) {
      return res.status(400).send("aRecords not found");
    }

    let available: any;
    if (userRecords?.length > 0) {
      available = filterItemsNotInArray(aRecords, userRecords);
    } else {
      available = aRecords;
    }
    return res.status(200).json(available);
  } catch (error) {
    return res.status(400).json(error);
  }
};

export default getAvailableAliases;