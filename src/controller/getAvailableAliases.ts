import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { route53Manager } from "../services/aws-route53";
import USER from "../models/user";
import { ObjectId } from "mongodb";

function filterItemsNotInArray(a, b) {
  const result = [];
  for (const aItem of a) {
    const existsInB = b.some((bItem) => {
      const url = new URL(bItem);
      const domainWithSubdomain = url.hostname;
      return domainWithSubdomain === aItem;
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

    const user = await USER.getById(new ObjectId(String(_id)));
    if (!user) {
      return res.status(400).send("user not found");
    }

    const userRecords = user.cmps
      .map((i) => i.url)
      .filter((i) => i.includes(String(domain)));

    const allRecords = await route53Manager.getAllRecordsInHostedZone(domain);
    if (!allRecords) {
      return res.status(400).send("records not found");
    }

    const aRecords = allRecords?.ResourceRecordSets.filter(
      (i: any) => i?.Type === "A"
    ).map((i: any) => i?.Name.slice(0, -1));
    if (!aRecords) {
      return res.status(400).send("aRecords not found");
    }

    let available: any;
    if (userRecords.length > 0) {
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