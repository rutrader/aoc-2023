function getInstructions(lines) {
  let routes = [];
  const turns = lines[0].split('')

  lines = lines.slice(2, lines.length)

  lines.forEach(line => {
    const [key, value] = line.split(' = ')
    const directions = [...value.matchAll(/([A-Z0-9]+)/g)].map(item => item[0])

    if (!routes[key]) {
      routes[key] = []
    }

    routes[key] = {
      L: directions[0],
      R: directions[1]
    }
  })
  return {turns, routes};
}

function part1(lines) {
  let {turns, routes} = getInstructions(lines);
  let currentStep = 'AAA'
  let turn = 0;
  let i = 0;

  while(currentStep !== 'ZZZ') {
    currentStep = routes[currentStep][turns[i++]];
    turn++;

    if(i >= turns.length) {
      i = 0;
    }
  }

  return turn;
}

function part2(lines) {
  const isStartNode = (node) => {
    return /A$/.test(node);
  }

  const isEndNode = (node) => {
    return /Z$/.test(node)
  }

  let {turns, routes} = getInstructions(lines);

  let starters = Object.keys(routes).filter(route => isStartNode(route))

  let stepsToDestination = [];

  for(let i = 0; Object.keys(stepsToDestination).length < starters.length; i++) {
    let instruction = turns[i % turns.length];

    starters = starters.map(item => routes[item][instruction])

    starters.forEach((item, index) => {
      if(isEndNode(item) && !(index in stepsToDestination)) {
        stepsToDestination[index] = i + 1
      }
    })
  }

  function findGCD(a, b) {
    return b === 0 ? a : findGCD(b, a % b);
  }

  function findLCM(a, b) {
    return (a * b) / findGCD(a, b);
  }
  
  return stepsToDestination.reduce(function (accumulator, currentValue) {
    return findLCM(accumulator, currentValue);
  }, 1);
}

module.exports = {
  part1,
  part2
}