import fs from "fs/promises";
const path = require("path");
const filePath = path.resolve(__dirname, "id.json");

export const incrementIdAndSave = async () => {
  const data = await fs.readFile(filePath, "utf8");
  let jsonData = JSON.parse(data);
  jsonData.id = Number(jsonData.id) + 1;
  await fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), "utf8");
};

export const getId = async () => {
  const data = await fs.readFile(filePath, "utf8");
  const jsonData = JSON.parse(data);
  return jsonData.id;
};
