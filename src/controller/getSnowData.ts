import { Request, Response } from "express";
import snowManager from "../services/snow";
import { validationResult } from "express-validator";
import CMP from "../models/cmps";

export const getSnowData = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { from, to, cmp } = req.query;

  const resp = await snowManager.countSkipTraffic(from, to, cmp);
  console.log(resp);

  return res.status(200).json({ resp });
};
export const getRows = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { from, to, cmp } = req.query;

  const resp = await snowManager.getRows(from, to, cmp);
  if (resp?.length > 100) {
    res.status(200).json({ resp: resp.slice(0, 100) });
    return;
  }
  // console.log(resp);

  return res.status(200).json({ resp });
};
export const countByDateAndParam = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { from, to, by, sort } = req.query;
  const resp = await snowManager.countByDateAndParam(from, to, by, sort);
  // console.log(resp);
  return res.status(200).json({ resp });
};
export const getTrkAnalytics = async (req: any, res: Response) => {
  try {
    const { cmps, dateFrom, dateTo, groupBy, tz, includeReasons } = req.body;
    console.log({ cmps: cmps.length, dateFrom, dateTo, groupBy, tz, includeReasons });

    if (!cmps || cmps.length < 1 || !dateFrom || !dateTo) {
      return res.status(400).send("must send cmps");
    }
    let resp
    if (groupBy) {
      resp = await snowManager.trkAnalytics(cmps, String(dateFrom), String(dateTo), groupBy, tz, includeReasons);
    } else {
      resp = await snowManager.trkAnalytics(cmps, String(dateFrom), String(dateTo), undefined, tz, includeReasons);
    }
    if (!resp) {
      return res.status(200).send(undefined);
    }
    console.log({ resp });
    // only for tracking page
    if (resp[0].CMP) {
      for (let index = 0; index < resp.length; index++) {
        const id = resp[index].CMP;
        const result = await CMP.findCmp(String(id));
        resp[index].CMP_NAME = result?.cmpName
        resp[index].DOMAIN = result?.domain
      }
    }
    return res.status(200).json(resp);
  } catch (error) {
    console.log(error.message);
    return res.status(200).send(undefined);
  }
};

export const drillDown = async (req: any, res: Response) => {
  try {
    const { whereQuery, groupBy, includeReasons } = req.body;
    console.log({ whereQuery, groupBy, includeReasons });

    const resp = await snowManager.drillDown(whereQuery, groupBy, includeReasons);
    console.log({ resp });

    for (let index = 0; index < resp.length; index++) {
      const element = resp[index];
      element.nodes = []
      element.id = index
    }

    return res.status(200).json({ type: groupBy, resp: resp });

  } catch (error) {
    console.log("in here");

    console.log(error.message);
  }
}