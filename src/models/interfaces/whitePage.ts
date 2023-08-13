import { Document, Model } from "mongoose";
import { ObjectId } from "mongodb";

export interface IWHITEPAGE {
  language: string;
  topic: string;
  link: string;
  domain: string;
}

export interface IWHITE_PAGE_Document extends IWHITEPAGE, Document {
  toJSON(): IWHITE_PAGE_Document;
}
export interface IWHITEPAGEModel extends Model<IWHITE_PAGE_Document> {
  createNew(data: IWHITEPAGE): Promise<IWHITE_PAGE_Document>;
  getById(_id: ObjectId): Promise<IWHITE_PAGE_Document>;
  findWhitePage(
    language: string | undefined,
    topic: string | undefined,
    domain: string
  ): Promise<IWHITE_PAGE_Document>;
  getLangsByDomain(domain: string): Promise<any>;
}
