const fs = require("fs");

module.exports = dumpToFile = (data) => {
  const dataToWrite = JSON.stringify(data);
  fs.appendFileSync(__dirname  + '/output.json', dataToWrite, 'utf-8');
}