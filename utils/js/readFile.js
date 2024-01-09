const path = require("path");
const fs = require("fs");
const readline = require("readline");

module.exports = readFile = async (filename, day) => {
  const filePath = path.join(__dirname, "../../", day, filename);
  const fileStream = fs.createReadStream(filePath);
  const rl = readline.createInterface({
    input: fileStream, crlfDelay: Infinity,
  });

  let lines = [];

  rl.on("line", (line) => {
    lines.push(line);
  });

  return new Promise((resolve) => {
    rl.on("close", () => {
      resolve(lines);
    })
  })

}