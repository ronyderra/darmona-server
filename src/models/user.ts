import { ObjectId } from "bson";
import { model, Schema } from "mongoose";
import { CustomDocumentBuild } from "../mongodb/documentDefaults";
import { IUSERDocument, IUSERModel, IUSER } from "./interfaces/user";

export const docUSER = {
  username: { type: String },
  password: { type: String },
  aliases: { type: [], default: [] },
  thriveId: { type: String },
  email: { type: String },
  blackPageDomains: { type: [], default: [] },
  role: { type: String, default: "affiliate" },
  count: { type: Number, optional: true },
  cmps: { type: [], optional: true },
};

export const schema = CustomDocumentBuild(docUSER, "users");

schema.statics.findUser = async function findUser(username: string, password: string) {
  try {
    const query = this.findOne({ username, password });
    return query.exec().then((doc: any) => doc);
  } catch (error: any) {
    console.log(error.message);
    return undefined;
  }
};
schema.statics.addUser = async function addUser(username: string, password: string, aliases: string[] | undefined, thriveId: string, email: string, blackPageDomains: string[] | undefined) {
  try {
    const query = this.findOne({ username, password });
    return query.exec().then((doc: any) => doc);
  } catch (error: any) {
    console.log(error.message);
    return undefined;
  }
};
schema.statics.incrementCount = async function incrementCount() {
  try {
    const query = this.findOneAndUpdate({ _id: new ObjectId("64fa03060a4670386240f4ad") }, { $inc: { count: 1 } });
    return query.exec().then((doc: any) => doc);
  } catch (error: any) {
    console.log(error.message);
    return undefined;
  }
};

const USER: IUSERModel = model<IUSERDocument, IUSERModel>("users", schema);
export default USER;
export { IUSER, IUSERModel };
