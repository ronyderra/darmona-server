import { Document, Model } from "mongoose";
import { ObjectId } from "mongodb";

export interface ICMP {
  userId: ObjectId;
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
  getCmpsByUser(userId: ObjectId): Promise<ICMPDocument[]>;
}
