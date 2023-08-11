import { Request, Response } from "express";
import snowManager from "../services/snow";

const getSnowData = async (req: Request, res: Response) => {
  const { from, to, skip, cmp } = req.query;

  const resp = await snowManager.executeSnow(
    from,
    to,
    JSON.parse(String(skip)),
    cmp
  );
  console.log(resp);

  return res.status(200).json({resp});
};

export default getSnowData;
