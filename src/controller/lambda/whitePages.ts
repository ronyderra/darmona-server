import { Request, Response } from "express";
import WHITE_PAGES, { IWHITEPAGE } from "../../models/whitePage";

export const handleNewWhitePage = async (req: Request, res: Response) => {
  try {
    const { key } = req.query;
    console.log("New white page in templatesd: ", { key });
    res.status(200).send(key);

    const keySplit = String(key).split("/");

    const doc: IWHITEPAGE = {
      language: keySplit[1],
      topic: keySplit[2],
      link: String(key).replace("templates/", ""),
      domain: "any",
      linkType: "html",
    };
    const result = await WHITE_PAGES.createNew(doc);
    console.log({ result });
    return;
  } catch (error) {
    return res.status(400).send("you must send language && topic && domain");
  }
};
