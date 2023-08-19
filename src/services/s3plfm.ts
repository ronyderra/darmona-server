import AWS from "aws-sdk";
import { config } from "dotenv";
config();

class PlFileManager {
  s3: AWS.S3;
  Bucket: string;
  constructor() {
    AWS.config.update({
      secretAccessKey: process.env.PRELANDERS_SECRET_ACCESS_KEY,
      accessKeyId: process.env.PRELANDERS_ACCESS_KEY_ID,
      region: process.env.REGION,
    });

    this.s3 = new AWS.S3();
    this.Bucket = process.env.DEPARTURE_PL_BUCKET || "";
  }

  async getAllFiles(path, bucket = this.Bucket) {
    try {
      return await this.s3
        .listObjectsV2({
          Bucket: bucket,
          Prefix: path,
          Delimiter: "/",
        })
        .promise();
    } catch (err) {
      return err;
    }
  }

  async getFile(id) {
    try {
      const obj = await this.s3
        .getObject({
          Bucket: this.Bucket,
          Key: `campaigns/${id}.json`,
        })
        .promise();
      return JSON.parse(obj.Body.toString());
    } catch (err) {
      console.log(err.message);
      return undefined;
    }
  }

  async updateFile(id, newData) {
    try {
      this.s3.getObject(
        {
          Bucket: this.Bucket,
          Key: `campaigns/${id}.json`,
        },
        (err, data) => {
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
              Bucket: this.Bucket,
              Key: `campaigns/${id}.json`,
              Body: updatedJsonData,
              ContentType: "application/json",
            };
            this.s3.putObject(putParams, (err) => {
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
      console.log(err.message);
      return undefined;
    }
  }

  async createFile(key, data) {
    try {
      const params = {
        Bucket: this.Bucket,
        Key: `campaigns/${key}.json`,
        Body: JSON.stringify(data),
      };
      return this.s3.upload(params).promise();
    } catch (err) {
      console.log("err", err);
      return undefined;
    }
  }
}

const s3plfm = new PlFileManager();
export default s3plfm;
