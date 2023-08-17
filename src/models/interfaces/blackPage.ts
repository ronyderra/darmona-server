import { Document, Model } from "mongoose";

export interface IBLACKPAGE {
  domain: string;
  lang: string;
  geo: string;
  template: string;
  celeb: string;
  offerPage: string;

  url: string;
}

export interface IBLACKPAGDocument extends IBLACKPAGE, Document {
  toJSON(): IBLACKPAGDocument;
}
export interface IBLACKPAGEModel extends Model<IBLACKPAGDocument> {
  findUser(username: string, password: string): Promise<IBLACKPAGDocument[]>;
}
