import { ObjectId } from "bson";
import { model, Schema } from "mongoose";
import { CustomDocumentBuild } from "../mongodb/documentDefaults";
import { ICMPDocument, ICMPModel, ICMP } from "./interfaces/cmps";

export const docCMP = {
  userId: { type: String },
  user: { type: String },
  cmpName: { type: String },
  cmpUrl: { type: String },
  cmpId: { type: String },
  createdAt: { type: Date },
};

export const schema = CustomDocumentBuild(docCMP, "cmps");

schema.statics.findCmp = async function findUser(cmpId: string) {
  try {
    const query = this.findOne({ cmpId });
    return query.exec().then((doc: any) => doc);
  } catch (error: any) {
    console.log(error.message);
    return undefined;
  }
};

const CMP: ICMPModel = model<ICMPDocument, ICMPModel>("cmps", schema);
export default CMP;
export { ICMP, ICMPModel };