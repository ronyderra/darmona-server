import { Document, Model } from "mongoose";

export interface IBLACKPAGE {
  version: string;
  geo: string;
  lang: string;
  template: string;
  celeb: string;
  offerPage: string;
  stagingLink: string;
  productionLink: string;
}

export interface IBLACKPAGEDocument extends IBLACKPAGE, Document {
  toJSON(): IBLACKPAGEDocument;
}
export interface IBLACKPAGEModel extends Model<IBLACKPAGEDocument> {
  createNew(data: IBLACKPAGE): Promise<IBLACKPAGEDocument>;
  getBlackPageByKey(link: string): Promise<IBLACKPAGEDocument>;
  getBlackPage(version: string, geo: string | undefined, celeb: string | undefined): Promise<IBLACKPAGEDocument[]>;
  getGeos(version: string): Promise<IBLACKPAGEDocument[]>;
  getCharactersV2(version: string, geo: string): Promise<IBLACKPAGEDocument[]>;
}
