import { Document, Model } from "mongoose";
import { ObjectId } from "mongodb";
import { ICMP } from "./cmps";

export interface IUSER {
  username: string;
  password: string;
  aliases: string[];
  thriveId: string;
  email: string;
  blackPageDomains: string[];
  role: Roles;
  cmps?: any;
  count?: number;
}

export enum Roles {
  Admin = "admin",
  Affiliate = "affiliate",
}
export interface IUSERDocument extends IUSER, Document {
  toJSON(): IUSERDocument;
}
export interface IUSERModel extends Model<IUSERDocument> {
  createNew(data: IUSER): Promise<IUSERDocument>;
  getById(_id: ObjectId): Promise<IUSERDocument>;
  findUser(username: string, password: string): Promise<IUSERDocument>;
  updateById(_id: ObjectId, updatedDocument: any): Promise<any>;
  incrementCount(): Promise<any>;
}
