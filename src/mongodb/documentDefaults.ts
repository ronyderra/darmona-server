import { Schema } from "mongoose";
import { ObjectId } from "mongodb";

export const CustomDocumentBuild = (custDoc: any, collection?: string) => {
  var schema: Schema = new Schema(custDoc, {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
      currentTime: () => new Date(),
    },
    versionKey: false,
    collation: { locale: "he", strength: 1 },
    collection,
  });
  schema.statics.createNew = async function createNew(newDocument: any) {
    try {
      console.log({ newDocument });
      return new this(newDocument).save();
    } catch (error: any) {
      console.log(error.message);
      return undefined;
    }
  };
  schema.statics.getById = async function getById(_id: ObjectId) {
    try {
      const query = this.findOne({ _id });
      return query.exec().then((doc: any) => (doc ? doc.toJSON() : undefined));
    } catch (error: any) {
      console.log(error.message);
      return undefined;
    }
  };
  schema.statics.removeById = async function removeById(_id: ObjectId) {
    return new Promise(async (res, rej) => {
      const query = this.findOneAndRemove({ _id });
      query.exec().then((r: any) => {
        if (!r) rej();
        else res(true);
      });
    });
  };
  schema.statics.updateById = async function updateById(
    _id: ObjectId,
    updatedDocument: any
  ) {
    return new Promise((res, rej) => {
      const query = this.findByIdAndUpdate({ _id }, updatedDocument, {
        new: true,
      });
      query.exec().then((r: any, err: any) => {
        if (err || !r) rej();
        else res(r);
      });
    });
  };
  return schema;
};
