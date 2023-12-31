import { ObjectId } from "mongodb";
import { model, Schema } from "mongoose";
import { CustomDocumentBuild } from "../mongodb/documentDefaults";
import { ICMPDocument, ICMPModel, ICMP } from "./interfaces/cmps";

export const docCMP = {
  userId: { type: ObjectId },
  user: { type: String },
  cmpName: { type: String },
  platformName: { type: String },
  dc_ep_name: { type: String },
  dc_ep: { type: String },
  ctype: { type: String },
  ip: { type: Boolean },
  track: { type: Boolean },
  cmpUrl: { type: String },
  cmpId: { type: String },
  status: { type: String },
  domain: { type: String },
  geo: { type: [], default: [] },
  eps: { type: [], default: [] },
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
    const query = this.find({ userId }).sort({ createdAt: -1 });
    return query.exec().then((doc: any) => doc);
  } catch (error: any) {
    console.log(error.message);
    return undefined;
  }
};
schema.statics.getCmpsByStatus = async function getCmpsByStatus(userId: ObjectId, status) {
  try {
    const query = this.find({ userId, status }).sort({ createdAt: -1 });
    return query.exec().then((doc: any) => doc);
  } catch (error: any) {
    console.log(error.message);
    return undefined;
  }
};

schema.statics.updateStatus = async function updateStatus(cmpDocId: ObjectId, status: string) {
  try {
    const query = this.updateOne({ _id: cmpDocId }, { status });
    return query.exec().then((doc: any) => doc);
  } catch (error: any) {
    console.log(error.message);
    return undefined;
  }
};

const CMP: ICMPModel = model<ICMPDocument, ICMPModel>("cmps", schema);
export default CMP;
export { ICMP, ICMPModel };
