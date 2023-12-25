import { ObjectId } from "bson";
import { model, Schema } from "mongoose";
import { CustomDocumentBuild } from "../mongodb/documentDefaults";
import {
  IBLACKPAGEDocument,
  IBLACKPAGEModel,
  IBLACKPAGE,
} from "./interfaces/blackPage";

export const docBLACKPAGE = {
  version: { type: String },
  geo: { type: String },
  lang: { type: String },
  template: { type: String },
  celeb: { type: String },
  stagingLink: { type: String },
  productionLink: { type: String },
};

export const schema = CustomDocumentBuild(docBLACKPAGE, "black_pages");

schema.statics.getCharactersV2 = async function getGeosByVersion(
  version: string,
  geo: string
) {
  try {
    const aggregateQuery = [
      { $match: { version: version, geo: geo } },
      { $group: { _id: null, uniqueCharacters: { $addToSet: "$celeb" } } },
    ];

    const result = await this.aggregate(aggregateQuery).exec();
    return result.length ? result[0].uniqueCharacters : [];
  } catch (error: any) {
    console.log(error.message);
    return undefined;
  }
};

schema.statics.getGeos = async function getGeosByVersion(version: string) {
  try {
    const aggregateQuery = [
      { $match: { version: version } },
      { $group: { _id: null, uniqueGeos: { $addToSet: "$geo" } } },
    ];

    const result = await this.aggregate(aggregateQuery).exec();
    return result.length ? result[0].uniqueGeos : [];
  } catch (error: any) {
    console.log(error.message);
    return undefined;
  }
};

schema.statics.getBlackPage = async function getBlackPage(
  version: string,
  geo: string | undefined,
  celeb: string | undefined
) {
  try {

    let queryObj: any = { version };
    if (celeb !== "undefined") {
      queryObj.celeb = celeb;
    }
    if (geo !== "undefined") {
      queryObj.geo = celeb;
    }
    console.log(queryObj);

    const query = this.find(queryObj);
    return query.exec().then((doc: any) => doc);
  } catch (error: any) {
    console.log(error.message);
    return undefined;
  }
};

schema.statics.getBlackPageByKey = async function getBlackPageByKey(link: string) {
  try {
    const query = this.findOne({ productionLink: link }).sort({ language: 1 });
    return query.exec().then((doc: any) => doc);
  } catch (error: any) {
    console.log(error.message);
    return undefined;
  }
};

const BLACKPAGE: IBLACKPAGEModel = model<IBLACKPAGEDocument, IBLACKPAGEModel>(
  "black_pages",
  schema
);
export default BLACKPAGE;
export { IBLACKPAGE, IBLACKPAGEModel };
