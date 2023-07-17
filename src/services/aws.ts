import AWS from "aws-sdk";
import { config } from "dotenv";
config();

AWS.config.update({
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  accessKeyId: process.env.ACCESS_KEY_ID,
  region: process.env.REGION,
});

const s3 = new AWS.S3();
const Bucket = process.env.BUCKET_NAME_PRODUCTION || "";

export const getAllFiles = async () => {
  try {
    return await s3.listObjectsV2({ Bucket }).promise();
  } catch (err) {
    return err;
  }
};

export const getFile = async (id: string) => {
  try {
    const obj = await s3
      .getObject({
        Bucket,
        Key: `campaigns/${id}.json`,
      })
      .promise();
    return JSON.parse(obj.Body.toString());
  } catch (err) {
    return err;
  }
};

export const updateFile = async (id: string, data: any) => {
  try {
    s3.getObject({
      Bucket,
      Key: `campaigns/${id}.json`,
    });
  } catch (err) {
    return err;
  }
};

module.exports = {
  getFile,
  getAllFiles,
  updateFile,
};
