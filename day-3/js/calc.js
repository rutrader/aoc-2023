const fs = require("fs");
const path = require("path");
const readline = require("readline");

function getNumbers(lines) {
  let numbers = [];

  const numberPattern = /\d+/g

  lines.forEach((line, row) => {
    [...line.matchAll(numberPattern)].filter(item => item.length > 0).map(item => {
      numbers.push({row: parseInt(row), col: parseInt(item.index), value: item[0]})
    })
  })
  return numbers;
}

function part1(fileName) {
  const filePath = path.join(__dirname, "../", fileName);
  const fileStream = fs.createReadStream(filePath);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  let lines = [];

  rl.on("line", (line) => {
    lines.push(line);
  });

  return new Promise((resolve) => {
    rl.on("close", () => {
      const numbers = getNumbers(lines);

      const width = lines[0].length;
      const height = lines.length;
      let sum = 0;

      numbers.forEach(number => {
        const start = Math.max(0, number.col - 1);
        const end = Math.min(width, number.col + number.value.length + 1 );
        const length = end - start;
        let counted = false;


        for(let row = Math.max(0, number.row - 1); row <= Math.min(height - 1, number.row + 1); row++) {
          let substr = lines[row].substring(start, start+length);

          if(!counted && substr.match(/[^\d\.]/)) {
            sum += parseInt(number.value);
            counted = true;
          }
        }
      })

      resolve(sum);
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

  let lines = [];

  rl.on("line", (line) => {
    lines.push(line);
  });

  return new Promise((resolve) => {
    rl.on("close", () => {
      const numbers = getNumbers(lines);
      const width = lines[0].length;
      const height = lines.length;
      let gears = [];

      numbers.forEach(number => {
        let counted = false;
        let start = Math.max(0, number.col - 1),
            end = Math.min(width, number.col + number.value.length + 1),
            length = end - start;

        for(let row = Math.max(0, number.row - 1); row <= Math.min(height - 1, number.row + 1); row++) {
          let substr = lines[row].substring(start, start+length);

          let gearMatches = substr.matchAll(/\*/g);

          [...gearMatches].map(item => item).forEach(gear => {
            let index = row + '_' + (start + gear.index)

            let position = gears.findIndex(item => item.index === index);

            if(position !== -1) {
              gears[position].value.push(parseInt(number.value))
            } else {
              gears.push({
                index, value: [
                    parseInt(number.value)
                ]
              })
            }


          })
        }
      })

      let gearRatios = 0;

      Object.keys(gears).forEach(key => {

        if(gears[key].value.length === 2) {
          gearRatios += gears[key].value.reduce((accumulator, currentValue) => accumulator * currentValue, 1)
        }
      });

      resolve(gearRatios);
    });
  });
}

module.exports = {
  part1,
  part2,
};
