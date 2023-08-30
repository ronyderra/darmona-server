import { ObjectId } from "bson";
import { model, Schema } from "mongoose";
import { CustomDocumentBuild } from "../mongodb/documentDefaults";
import { ICHARACTERDocument, ICHARACTERModel, ICHARACTER } from "./interfaces/characters";

export const docCHARACTER = {
  CHARACTERname: { type: String },
  password: { type: String },
  aliases: { type: [], default: [] },
  thriveId: { type: String },
  email: { type: String },
  blackPageDomains: { type: [], default: [] },
  cmps: { type: [], default: [] },
  role: { type: String, default: "affiliate" },
  count: { type: Number, optional: true },
};

export const schema = CustomDocumentBuild(docCHARACTER, "characters");


const CHARACTER: ICHARACTERModel = model<ICHARACTERDocument, ICHARACTERModel>("characters", schema);
export default CHARACTER;
export { ICHARACTER, ICHARACTERModel };
