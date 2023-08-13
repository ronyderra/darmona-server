import { Request, Response } from "express";
import WHITE_PAGES from "../models/whitePage";

const getWhitePage = async (req: Request, res: Response) => {
  const { language, topic, domain } = req.query;
  if (language==="" && topic==="" && domain !== "") {
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
};

export default getWhitePage;
