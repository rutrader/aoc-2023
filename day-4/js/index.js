const calc = require("./calc");
const readFile = require('../../utils/js/readFile')

readFile('input', 'day-4')
    .then((lines) => {
        console.log(
          calc.part1(lines),
          calc.part2(lines)
        );
    })


// calc
//   .part1("demo")
//   .then((lines) => {
//     console.log(lines);
//   })
//   .catch((error) => {
//     console.error("Error reading file:", error);
//   });
//
// calc
//   .part2("demo")
//   .then((lines) => {
//     console.log(lines);
//   })
//   .catch((error) => {
//     console.error("Error reading file:", error);
//   });