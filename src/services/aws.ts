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

export const updateFile = async (id: string, newData: any) => {
  try {
    s3.getObject(
      {
        Bucket,
        Key: `campaigns/${id}.json`,
      },
      function (err, data) {
        if (err) {
          console.error("Error retrieving the JSON file:", err);
        } else {
          const existingJson = JSON.parse(data.Body.toString("utf-8"));
          for (const key in existingJson) {
            if (newData.hasOwnProperty(key)) {
              existingJson[key] = newData[key];
            }
          }
          const updatedJsonData = JSON.stringify(existingJson);
          const putParams = {
            Bucket,
            Key: `campaigns/${id}.json`,
            Body: updatedJsonData,
            ContentType: "application/json",
          };
          s3.putObject(putParams, function (err) {
            if (err) {
              console.error("Error updating the JSON file:", err);
            } else {
              console.log("JSON file updated successfully!");
            }
          });
        }
      }
    );
  } catch (err) {
    return err;
  }
};

export const createFile = async (key: any, data: any) => {
  try {
    const params = {
      Bucket,
      Key: key,
      Body: data,
    };
    return s3.upload(params).promise();
  } catch (err) {
    return err;
  }
};

module.exports = {
  getFile,
  getAllFiles,
  updateFile,
  createFile,
};
