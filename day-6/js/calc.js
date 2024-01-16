function getData(lines, parse = false) {
  return lines.map(line => {
    return line.match(/(\d+)/g).map(item => {
      return parse ? parseInt(item) : item
    })
  })
}

function getWinVariants(timings, distance) {

}

function countVariants(time, distance) {
  let count = 0;

  for (let i = 0; i < time; i++) {
    if (i * (time - i) > distance) {
      count++;
    }
  }

  return count
}

function part1(lines) {
  const [timings, distances] = getData(lines);

  let winVariants = 1;

  timings.forEach((time, index) => {
    winVariants *= countVariants(time, distances[index])
  })

  return winVariants;
}

function part2(lines) {

  const [timings, distances] = getData(lines);

  parseInt(timings.join(''))

  return countVariants(timings.join(''), distances.join(''));
}

module.exports = {
  part1,
  part2
}