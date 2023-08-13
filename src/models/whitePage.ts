import { ObjectId } from "bson";
import { model } from "mongoose";
import { CustomDocumentBuild } from "../mongodb/documentDefaults";
import {
  IWHITE_PAGE_Document,
  IWHITEPAGEModel,
  IWHITEPAGE,
} from "./interfaces/whitePage";

export const docWHITE_PAGE = {
  language: { type: String },
  topic: { type: String },
  link: { type: String },
  domain: { type: String },
};

export const schema = CustomDocumentBuild(docWHITE_PAGE, "white_pages");

schema.statics.getLangsByDomain = async function getLangsByDomain(
  domain: string
) {
  try {
    const query = this.find(
      { domain },
      { language: 1, topic: 1, link: 1, _id: 0 }
    );
    return query.exec().then((doc: any) => doc);
  } catch (error: any) {
    console.log(error.message);
    return undefined;
  }
};

schema.statics.getTopics = async function getTopics(
  domain: string,
  language: string
) {
  try {
    const query = this.find({ domain, language }, { topic: 1, _id: 0 });
    return query.exec().then((doc: any) => doc);
  } catch (error: any) {
    console.log(error.message);
    return undefined;
  }
};

schema.statics.findWhitePage = async function findWhitePage(
  language: string | undefined,
  topic: string | undefined,
  domain: string
) {
  try {
    const query = this.findOne({ language, topic, domain });
    return query.exec().then((doc: any) => doc);
  } catch (error: any) {
    console.log(error.message);
    return undefined;
  }
};

const WHITE_PAGES: IWHITEPAGEModel = model<
  IWHITE_PAGE_Document,
  IWHITEPAGEModel
>("white_pages", schema);
export default WHITE_PAGES;
export { IWHITEPAGE, IWHITEPAGEModel };
