import { Document, Model } from "mongoose";

export interface IUSER {
  username: string;
  password: string;
  aliases: string[];
  thriveId: string;
  email: string;
  blackPageDomains: string[];
  cmps: [
    {
      name: string;
      url: string;
    }
  ];
}

export interface IUSERDocument extends IUSER, Document {
  toJSON(): IUSERDocument;
}
export interface IUSERModel extends Model<IUSERDocument> {
  findUser(username: string, password: string): Promise<IUSERDocument[]>;
}
