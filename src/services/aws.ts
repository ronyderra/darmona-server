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

export const getSingleFile = async (id: string) => {
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

// const deleteSingleFile = async (Key: string) => {
//   try {
//     return await s3.deleteObject({ Bucket, Key }).promise();
//   } catch (err) {
//     return err;
//   }
// };

// const deleteMultipleFiles = async (Objects: any) => {
//   const params = { Bucket, Delete: { Objects, Quiet: false } };
//   try {
//     return s3.deleteObjects(params).promise();
//   } catch (err) {
//     return err;
//   }
// };

// const uploadSingleFile = multer({
//   fileFilter: (req, file, cb) => {
//     if (
//       file.originalname.includes(".jpeg") ||
//       file.originalname.includes(".jpg") ||
//       file.originalname.includes(".png")
//     ) {
//       cb(null, true);
//     } else {
//       cb(new Error("Invalid Mime Type, only JPG, JEPG and PNG", false));
//     }
//   },
//   limits: { files: 1, fileSize: 1024 * 1024 },
//   storage: multerS3({
//     s3,
//     bucket: Bucket,
//     acl: "public-read",
//     metadata: (req, file, cb) => {
//       cb(null, { fieldName: "file_metadata" });
//     },
//     key: (req, file, cb) => {
//       cb(null, Date.now().toString() + file.originalname);
//     },
//   }),
// });

module.exports = {
  //   uploadSingleFile,
  getSingleFile,
  getAllFiles,
  //   deleteSingleFile,
  //   deleteMultipleFiles,
};
