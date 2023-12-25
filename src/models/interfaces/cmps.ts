import { Document, Model } from "mongoose";
import { ObjectId } from "mongodb";

export interface ICMP {
  userId: ObjectId;
  user: string;
  cmpName: string;
  platformName: string;
  dc_ep_name: string;
  dc_ep: string;
  ip: boolean;
  track: boolean;
  ctype: string;
  cmpUrl: string;
  cmpId: string;
  status: string;
  domain: string;
  geo: any[];
  eps: any[];
}

export interface ICMPDocument extends ICMP, Document {
  toJSON(): ICMPDocument;
}
export interface ICMPModel extends Model<ICMPDocument> {
  findCmp(cmpId: string): Promise<ICMPDocument>;
  createNew(doc: ICMP): Promise<ICMPDocument>;
  getCmpsByUser(userId: ObjectId): Promise<ICMPDocument[]>;
  getCmpsByStatus(userId: ObjectId, status: string): Promise<ICMPDocument[]>;
  updateById(_id: ObjectId, updatedDocument: any): Promise<ICMPDocument>;
  updateStatus(cmpDocId: ObjectId, status: string): Promise<ICMPDocument>;
}
