const calc = require("./calc");
const readFile = require('../../utils/js/readFile')

readFile('input', 'day-8')
  .then((lines) => {
    console.log(
      calc.part1(lines),
      calc.part2(lines)
    );
  })