const fs = require("fs");
const path = require("path");
const readline = require("readline");

function sumOfFilteredNumbers(fileName) {
  const filePath = path.join(__dirname, "../", fileName);
  const fileStream = fs.createReadStream(filePath);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  const lines = [];

  rl.on("line", (line) => {
    lines.push(line);
  });

  return new Promise((resolve) => {
    rl.on("close", () => {
      const sum = [];

      lines.forEach((line) => {
        let filteredNumber = line.replace(/[^0-9]/g, "").split("");
        sum.push(
          parseInt(
            filteredNumber[0] + filteredNumber[filteredNumber.length - 1],
            10
          )
        );
      });

      resolve(sum.reduce((acc, currentValue) => acc + currentValue, 0));
    });
  });
}

function part2(fileName) {
  const filePath = path.join(__dirname, "../", fileName);
  const fileStream = fs.createReadStream(filePath);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  const lines = [];

  rl.on("line", (line) => {
    lines.push(line);
  });

  const mapNumbers = {
    zero: 0,
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
  };

  const regex = /(?=(\d|zero|one|two|three|four|five|six|seven|eight|nine))/g;

  return new Promise((resolve) => {
    rl.on("close", () => {
      let sum = 0;

      lines.forEach((line) => {
        const matches = [...line.matchAll(regex)].map((item) => item[1]);

        const first = mapNumbers.hasOwnProperty(matches[0])
            ? mapNumbers[matches[0]]
            : matches[0],
          last = mapNumbers.hasOwnProperty(matches[matches.length - 1])
            ? mapNumbers[matches[matches.length - 1]]
            : matches[matches.length - 1];

        sum += parseInt(first + "" + last);
      });

      resolve(sum);
    });
  });
}

module.exports = {
  sumOfFilteredNumbers,
  part2,
};
