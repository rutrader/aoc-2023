const fs = require("fs");
const path = require("path");
const readline = require("readline");

function part1(fileName) {
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
      const limits = {
        red: 12,
        blue: 14,
        green: 13,
      };

      let result = [];

      const regex = /\d+ (blue|red|green)/g;
      let colors = [];

      for (const [index, game] of lines.entries()) {
        let gameIndex = index + 1;

        colors[index] = [];

        let [, cubes] = game.split(": ");

        let matches = [...cubes.matchAll(regex)].map((item) => item[0]);

        linesLoop: for (const value of matches) {
          let [count, color] = value.split(" ");

          if (limits[color] >= count) {
            result[gameIndex] = true;
          } else {
            result[gameIndex] = false;
            break linesLoop;
          }
        }
      }

      const sum = result
        .map((val, index) => ({ val, index }))
        .filter((item) => item.val === true)
        .map((item) => item.index)
        .reduce((acc, currentValue) => acc + currentValue, 0);

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

  const lines = [];

  rl.on("line", (line) => {
    lines.push(line);
  });
  
  const lineGameRegex = /Game (\d+): (.+)/;
  const cubeRegex = /(\d+)(.*)/;

  let totalPower = 0;

  return new Promise((resolve) => {
    rl.on("close", () => {

      lines.forEach((line) => {
        const match = line.match(lineGameRegex);

        const game = match[2],
          rounds = game.split('; ');

        let colors = {
          red: 0,
          green: 0,
          blue: 0,
        };

        rounds.forEach((round) => {
            const cubes = round.split(',');

            cubes.forEach((cube) => {
                const cubeMatch = cube.match(cubeRegex);

                const count = cubeMatch[1];
                const color = cubeMatch[2].trim();

                colors[color] = Math.max(colors[color], count);
            })
        });

        const power = colors['red'] * colors['green'] * colors['blue'];
        totalPower += power;

      });

      resolve(totalPower);
    });
  });
}

module.exports = {
  part1,
  part2,
};