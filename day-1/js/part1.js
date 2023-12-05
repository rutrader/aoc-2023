
const calc = require("./calc");

calc
  .sumOfFilteredNumbers("input.txt")
  .then((lines) => {
    console.log(lines);
  })
  .catch((error) => {
    console.error("Error reading file:", error);
  });
