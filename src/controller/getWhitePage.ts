import { Request, Response } from "express";
import WHITE_PAGES from "../models/whitePage";

export const getWhitePage = async (req: Request, res: Response) => {
  try {
    const { language, topic, domain } = req.query;
    if (language === "" && topic === "" && domain !== "") {
      const result = await WHITE_PAGES.getLangsByDomain(String(domain));
      return res.status(200).json(result);
    } else if (language && topic && domain) {
      const result = await WHITE_PAGES.findWhitePage(
        String(language),
        String(topic),
        String(domain)
      );
      return res.status(200).json(result);
    } else {
      return res.status(400).send("you must send language && topic && domain");
    }
  } catch (error) {
    return res.status(400).send("you must send language && topic && domain");
  }
};

export const getWhitePageHtmlType = async (req: Request, res: Response) => {
  try {
    const result = await WHITE_PAGES.getWhitePageHtmlType();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).send("you must send language && topic && domain");
  }
};
