import { ObjectId } from "mongodb";
import { model, Schema } from "mongoose";
import { CustomDocumentBuild } from "../mongodb/documentDefaults";
import { ICMPDocument, ICMPModel, ICMP } from "./interfaces/cmps";

export const docCMP = {
  userId: { type: ObjectId },
  user: { type: String },
  cmpName: { type: String },
  cmpUrl: { type: String },
  cmpId: { type: String },
  status: { type: String },
  domain: { type: String },
  createdAt: { type: Date },
};

export const schema = CustomDocumentBuild(docCMP, "cmps");

schema.statics.findCmp = async function findCmp(cmpId: string) {
  try {
    const query = this.findOne({ cmpId });
    return query.exec().then((doc: any) => doc);
  } catch (error: any) {
    console.log(error.message);
    return undefined;
  }
};

schema.statics.getCmpsByUser = async function getCmpsByUser(userId: ObjectId) {
  try {
    const query = this.find({ userId });
    return query.exec().then((doc: any) => doc);
  } catch (error: any) {
    console.log(error.message);
    return undefined;
  }
};

const CMP: ICMPModel = model<ICMPDocument, ICMPModel>("cmps", schema);
export default CMP;
export { ICMP, ICMPModel };
