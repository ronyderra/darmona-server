import { Document, Model } from "mongoose";
import { ObjectId } from "mongodb";

export interface IUSER {
  username: string;
  password: string;
  aliases: string[];
  thriveId: string;
  email: string;
  blackPageDomains: string[];
  cmps: CMP[];
  role: Roles;
  count?: number;
}

export enum Roles {
  Admin = "admin",
  Affiliate = "affiliate",
}

export interface CMP {
  name: string;
  url: string;
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
