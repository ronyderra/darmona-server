import { Request, Response } from "express";
import WHITE_PAGES from "../../models/whitePage";

export const handleNewWhitePage = async (req: Request, res: Response) => {
  try {
    const { key } = req.query;
    const result = await WHITE_PAGES.getWhitePageHtmlType();
    console.log(result);

    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).send("you must send language && topic && domain");
  }
};
