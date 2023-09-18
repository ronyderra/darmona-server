import { Document, Model } from "mongoose";

export interface ICMP {
  userId: string;
  user: string;
  cmpName: string;
  cmpUrl: string;
  cmpId: string;
  status: string;
  domain: string;
}

export interface ICMPDocument extends ICMP, Document {
  toJSON(): ICMPDocument;
}
export interface ICMPModel extends Model<ICMPDocument> {
  findCmp(cmpId: string): Promise<ICMPDocument>;
  createNew(doc: ICMP): Promise<ICMPDocument>;
}
