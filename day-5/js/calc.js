const messages = require("../../utils/js/contstants");

function part1(lines) {

  let seeds = lines[0].split(': ')[1].split(" ").filter(e => !isNaN(e)).map(e => parseInt(e))

  let mapIndex = 1
  let mappings = []

  lines
    .forEach((line, index) => {

      if(index <= 1) {
        return;
      }
      const mapRegex = new RegExp(/([a-z\-]+)/g)

      if (line.match(mapRegex)) {
        mapIndex = index
        mappings = []
      }
      if (index > mapIndex) {
        const [dest, source, length] = line.split(' ').map(e => parseInt(e))
        seeds = seeds.map((seed, index) => {
          if (!mappings.includes(index) && seed >= source && seed < source + length) {
            mappings.push(index)
            return dest + (seed - source)
          } else {
            return seed
          }
        })
      }
    })

  return Math.min(...seeds)
}

function part2(lines) {
  return messages.MESSAGE_USE_PHP;
}

module.exports = {
  part1, part2,
};

