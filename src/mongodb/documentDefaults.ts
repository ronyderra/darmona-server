import { Document, model, Schema } from 'mongoose'
import { ObjectId } from 'mongodb'

export const CustomDocumentBuild = (custDoc: any, collection?: string) => {
    var schema: Schema = new Schema(custDoc,
        {
            timestamps: {
                createdAt: 'createdAt',
                updatedAt: 'updatedAt',
                currentTime: () => new Date()
            },
            versionKey: false,
            collation: { locale: 'he', strength: 1 },
            collection
        })
    // schema.index({ '$**': 'text' })
    // schema.set('toJSON', {
    //     transform(doc: any, ret: any) {
    //         delete ret.__v
    //     },
    // })
    // schema.set('toObject', {
    //     transform(doc: any, ret: any) {
    //         delete ret.__v
    //     },
    // })
    /**
     * Saves the document data to MongoDB
     * @param {*} newDocument - a new Object
     * @returns the saved Store
     */
    schema.statics.createNew = async function createNew(newDocument: any) {
        try {
            console.log({newDocument})
            return new this(newDocument).save();
        } catch (error:any) {
            console.log(error.message);
            return undefined;
        }
    }

    /**
     * Looks up a Document in the DB
     * @param {ObjectId} _id a Document ID
     * @returns a Document if one is found by ID
     */
    schema.statics.getById = async function getById(_id: ObjectId) {
        try {
            const query = this.findOne({ _id });
            return query.exec().then((doc: any) => (doc ? doc.toJSON() : undefined));
        } catch (error:any) {
            console.log(error.message);
            return undefined;
        }
    }

    /**
     * Checks whether a given _id exists in the DB and deletes the Document with the _id
     * @param _id a Document ID
     * @returns true in case of success and false otherwise
     */
    schema.statics.removeById = async function removeById(_id: ObjectId) {
        return new Promise(async (res, rej) => {
            const query = this.findOneAndRemove({ _id })
            query.exec().then((r: any) => {
                if (!r) rej()
                else res(true)
            })
        })
    }
    /**
     * Updates a document in the DB of one is found by _id and returns the new version
     * @param id - document object _id
     * @param updatedDocument - document with updated fields
     */
    schema.statics.updateById = async function updateById(_id: ObjectId, updatedDocument: any) {
        return new Promise((res, rej) => {
            const query = this.findByIdAndUpdate({ _id }, updatedDocument, { new: true })
            query.exec().then((r: any, err: any) => {
                if (err || !r) rej()
                else res(r)
            })
        })
    }
    return schema
}