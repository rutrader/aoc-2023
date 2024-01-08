const fs = require("fs");
const path = require("path");
const readline = require("readline");

const arraySum = require('../../utils/js/array_sum');

const readFiles = async (filename) => {
  const filePath = path.join(__dirname, "../", filename);
  const fileStream = fs.createReadStream(filePath);
  const rl = readline.createInterface({
    input: fileStream, crlfDelay: Infinity,
  });

  let lines = [];

  rl.on("line", (line) => {
    lines.push(line);
  });

  let sum = 0;
  return new Promise((resolve) => {
    rl.on("close", () => {
      resolve(lines);
    })
  })

}

function getNumbers(left, right) {
  let leftNumbers = [];
  let rightNumbers = [];

  [...left.matchAll(/(\d+)/g)].filter(item => item.length > 0).map(item => {
    leftNumbers.push(item[0]);
  });

  [...right.matchAll(/(\d+)/g)].filter(item => item.length > 0).map(item => {
    rightNumbers.push(item[0]);
  })
  return {leftNumbers, rightNumbers};
}

function part1(lines) {
  let sum = 0;

  lines.forEach(line => {
    const [, numbers] = line.split(':').map(item => item.trim());
    const [left, right] = numbers.split('|').map(item => item.trim());

    let {leftNumbers, rightNumbers} = getNumbers(left, right);

    let counter = rightNumbers
      .filter(value => leftNumbers.includes(value)).length;

    sum += counter > 1 ? Math.pow(2, counter - 1) : Number(counter === 1);

  })

  return sum;
}

function part2(lines) {

  let cards = [];

  lines.forEach((line, index) => {
    const [, numbers] = line.split(':').map(item => item.trim());
    const [left, right] = numbers.split('|').map(item => item.trim());

    let {leftNumbers, rightNumbers} = getNumbers(left, right);

    let counter = rightNumbers
      .filter(value => leftNumbers.includes(value)).length;

    cards[index] = {
      counter
    };
  })

  let counts = Array(cards.length).fill(1);

  cards.forEach((card, index) => {
    for(let i = 1; i <= card.counter; ++i) {
      if((index + i) < cards.length) {
        counts[index + i] += counts[index];
      }
    }
  })

  return counts.arraySum();
}

module.exports = {
  readFiles, part1, part2,
};
