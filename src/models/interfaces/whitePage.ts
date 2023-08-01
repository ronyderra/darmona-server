import { Document, Model } from "mongoose";

export interface IWHITEPAGE {
  domain: string;
  lang: string;
  topic: string;
  url: string;
}

export interface IWHITEPAGEDocument extends IWHITEPAGE, Document {
  toJSON(): IWHITEPAGEDocument;
}
export interface IWHITEPAGEModel extends Model<IWHITEPAGEDocument> {
  findPage(username: string, password: string): Promise<IWHITEPAGEDocument[]>;
}
