import fs from "fs";

function saveDataLocally(data) {
  const jsonData = JSON.stringify(data, null, 2);
  fs.writeFileSync("backend/pipeline/output.json", jsonData);
  console.log("Data saved to output.json");
}

export { saveDataLocally };
