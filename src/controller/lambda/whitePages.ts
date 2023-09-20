import { Request, Response } from "express";
import WHITE_PAGES from "../../models/whitePage";

export const handleNewWhitePage = async (req: Request, res: Response) => {
  try {
    const { key } = req.query;
    console.log(key);
    // const result = await WHITE_PAGES.getWhitePageHtmlType();
    return res.status(200).send(key);
  } catch (error) {
    return res.status(400).send("you must send language && topic && domain");
  }
};
