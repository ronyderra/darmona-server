import { ObjectId } from "bson";
import { model, Schema } from "mongoose";
import { CustomDocumentBuild } from "../mongodb/documentDefaults";
import { IUSERDocument, IUSERModel, IUSER ,CMP } from "./interfaces/user";

export const docUSER = {
  username: { type: String },
  password: { type: String },
  aliases: { type: [], default: [] },
  thriveId: { type: String },
  email: { type: String },
  blackPageDomains: { type: [], default: [] },
  cmps: { type: [], default: [] },
};

export const schema = CustomDocumentBuild(docUSER, "users");

schema.statics.findUser = async function findUser(
  username: string,
  password: string
) {
  try {
    const query = this.findOne({ username, password });
    return query.exec().then((doc: any) => doc);
  } catch (error: any) {
    console.log(error.message);
    return undefined;
  }
};
schema.statics.addUser = async function addUser(
  username: string,
  password: string,
  aliases: string[] | undefined,
  thriveId: string,
  email: string,
  blackPageDomains: string[] | undefined,
  cmps: CMP[] | undefined,
) {
  try {
    const query = this.findOne({ username, password });
    return query.exec().then((doc: any) => doc);
  } catch (error: any) {
    console.log(error.message);
    return undefined;
  }
};

const USER: IUSERModel = model<IUSERDocument, IUSERModel>("users", schema);
export default USER;
export { IUSER, IUSERModel };
