const calc = require("./calc");

calc
  .part1("input.txt")
  .then((lines) => {
    console.log(lines);
  })
  .catch((error) => {
    console.error("Error reading file:", error);
  });

calc
  .part2("input.txt")
  .then((lines) => {
    console.log(lines);
  })
  .catch((error) => {
    console.error("Error reading file:", error);
  });
