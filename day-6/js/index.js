const calc = require("./calc");
const readFile = require('../../utils/js/readFile')

readFile('demo', 'day-6')
  .then((lines) => {
    console.log(
      calc.part1(lines),
      calc.part2(lines)
    );
  })