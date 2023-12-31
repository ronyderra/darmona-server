import { Request, Response } from "express";
import WHITE_PAGES, { IWHITEPAGE } from "../../models/whitePage";
import BLACKPAGE from "../../models/blackPage";

export const handleNewWhitePage = async (req: Request, res: Response) => {
  try {
    const { key } = req.query;
    res.status(200).send(key);

    const keySplit = String(key).split("/");
    switch (true) {
      case String(key).includes("btl_prelanders/"):
        const bp = await BLACKPAGE.getBlackPageByKey(String(key).replace("templates/", ""));
        if (!bp) {
          await BLACKPAGE.createNew({
            version: "html",
            geo: keySplit[2],
            lang: keySplit[3],
            template: keySplit[4],
            celeb: keySplit[5],
            offerPage: keySplit[6],
            stagingLink: String(key).split("templates/")[1],
            productionLink: String(key).split("templates/")[1],
          });
        }
        break;
      default:
        const docs = await WHITE_PAGES.getWhitePageByKey(String(key).replace("templates/", ""));
        if (!docs) {
          const doc: IWHITEPAGE = {
            language: keySplit[4],
            topic: keySplit[1],
            link: String(key).replace("templates/", ""),
            domain: "any",
            linkType: "html",
          };
          const result = await WHITE_PAGES.createNew(doc);
          console.log({ result });
        }
        break;
    }
    return;
  } catch (error) {
    console.log("error in handleNewWhitePage: ", error.message);
    return res.status(400).send("you must send language && topic && domain");
  }
};
