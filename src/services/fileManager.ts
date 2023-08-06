const fs = require("fs");

export const incrementIdAndSave = () => {
  fs.readFile("./id.json", "utf8", (err, data) => {
    if (err) {
      console.error("Error reading JSON file:", err);
      return;
    }
    try {
      const jsonData = JSON.parse(data);
      const currentId = jsonData.id;
      const updatedId = currentId + 1;

      jsonData.id = updatedId;

      fs.writeFile(
        "./id.json",
        JSON.stringify(jsonData, null, 2),
        "utf8",
        (err) => {
          if (err) {
            console.error("Error saving JSON file:", err);
            return;
          }

          console.log(`ID successfully incremented and saved: ${updatedId}`);
        }
      );
    } catch (parseError) {
      console.error("Error parsing JSON:", parseError);
    }
  });
};

export const getId = () => {
  fs.readFile("./id.json", "utf8", (err, data) => {
    if (err) {
      console.error("Error reading JSON file:", err);
      return;
    }
    try {
      const jsonData = JSON.parse(data);
      return jsonData.id;
    } catch (parseError) {
      console.error("Error parsing JSON:", parseError);
    }
  });
};
