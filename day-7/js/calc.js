const HIGH_CARD = 'high-card'
const ONE_PAIR = 'one-pair'
const TWO_PAIR = 'two-pair'
const THREE_KIND = 'three-of-a-kind'
const FULL_HOUSE = 'full-house'
const FOUR_KIND = 'four-of-a-kind';
const FIVE_KIND = 'five-of-a-kind'

const HANDS = [
  HIGH_CARD,
  ONE_PAIR,
  TWO_PAIR,
  THREE_KIND,
  FULL_HOUSE,
  FOUR_KIND,
  FIVE_KIND
]

const classicOrder = "23456789TJQKA"
const jokerizedOrder = "23456789TQKA"

function countConsecutiveSymbols(line) {
  const counts = {};
  // Iterate through each character in the line
  for (let i = 0; i < line.length; i++) {
    const currentSymbol = line[i];

    // Check if the next character is the same
    let consecutiveCount = 1;
    while (line[i + 1] === currentSymbol) {
      consecutiveCount++;
      i++;
    }

    // Update counts object
    if (consecutiveCount > 1) {
      if (!counts[currentSymbol]) {
        counts[currentSymbol] = [];
      }
      counts[currentSymbol].push(consecutiveCount);
    }
  }

  return counts;
}

function part1(lines) {

  const {hands, bids, handsOrder} = parseLines(lines);

  hands.forEach((hand, index) => {
    let sorted = hand.split('').sort()

    const counts = countConsecutiveSymbols(sorted);
    const length = Object.values(counts).length;

    if(length === 1) {
      const card = Object.values(counts)[0][0];
      let type = HIGH_CARD;

      switch (card) {
        case 2:
          type = ONE_PAIR;
          break
        case 3:
          type = THREE_KIND
          break
        case 4:
          type = FOUR_KIND
          break;
        case 5:
          type = FIVE_KIND
          break
      }

      handsOrder[type].push({
        hand: hand,
        line: index
      })

    } else if (length === 2) {
      const pairs = Object.values(counts);

      handsOrder[(pairs[0][0] === pairs[1][0]) ? TWO_PAIR : FULL_HOUSE].push({
        hand: hand,
        line: index
      })
    } else {
      handsOrder[HIGH_CARD].push({
        hand: hand,
        line: index
      });
    }
  })

  let rank = 1

  Object.keys(handsOrder).forEach((type) => {
    const cards = handsOrder[type];

    if(cards.length >= 2) {
      handsOrder[type] = sort(cards);
    }
  })

  let sum = 0;

  Object.keys(handsOrder).forEach(type => {
    handsOrder[type].forEach(hand => {
      let bid = rank * bids[hand.line]
      sum += bid;
      rank++;
    })
  })

  return sum;
}

function parseLines(lines) {
  const hands = lines.map(line => line.split(' ')).map(item => item[0])
  const bids = lines.map(line => line.split(' ')).map(item => item[1])

  const handsOrder = [...HANDS].reduce((accumulator, currentValue) => {
    accumulator[currentValue] = [];
    return accumulator;
  }, {});
  return {hands, bids, handsOrder};
}

function part2(lines) {

  const {hands, bids, handsOrder} = parseLines(lines);

  hands.forEach((hand, index) => {
    const jokerized = jokerize(hand)
    const type = getType(jokerized)

    handsOrder[type].push({
      hand,
      line: index,
      jokerize: jokerized,
      bid: bids[index]
    })

    if(handsOrder[type].length >= 2) {
      sort(handsOrder[type], true)
    }
  })

  let rank = 1;
  let sum = 0;

  Object.keys(handsOrder).forEach(type => {
    handsOrder[type].forEach(hand => {
      let bid = rank * bids[hand.line]
      sum += bid;
      rank++;
    })
  })

  return sum;
}

function jokerize(card) {
  const orderArr = jokerizedOrder.split('')

  const strength = (type) => {
    return HANDS.indexOf(type)
  }
  const oldType = getType(card);
  let highestCard = card;

  for(let i = 0; i < orderArr.length; i++) {
    if(card.indexOf('J') >= 0) {
      let jokerized = card.replaceAll('J', jokerizedOrder[i]);

      let newType = getType(jokerized);
      let highestTypeStrength = getType(highestCard)

      if(strength(newType) >= strength(highestTypeStrength)) {
        highestCard = jokerized
      }
    }
  }
  return highestCard
}

function sort(cards, jokerize = false) {

  let order = classicOrder.split('')

  if(jokerize) {
    order = jokerizedOrder.split('');
    order.unshift('J')
  }

  cards.sort((a, b) => {
    let positionA = 0;
    let positionB = 0;

    for(let i = 0; i < a.hand.length; i++) {
      positionA = order.indexOf(a.hand[i]) + 1;
      positionB = order.indexOf(b.hand[i]) + 1;

      if(positionB > positionA) {
        return -1
      } else if (positionB < positionA) {
        return 1
      }
    }
    return 0;
  })

  return cards
}

function getType(card) {
  const consecutiveSymbols = countConsecutiveSymbols(
    card.split('').sort().join('')
  );
  const length = Object.values(consecutiveSymbols).length;

  let type = HIGH_CARD;
  if(length === 1) {
    const card = Object.values(consecutiveSymbols)[0][0];

    switch (card) {
      case 2:
        type = ONE_PAIR;
        break
      case 3:
        type = THREE_KIND
        break
      case 4:
        type = FOUR_KIND
        break;
      case 5:
        type = FIVE_KIND
        break
    }
  } else if (length === 2) {
    const pairs = Object.values(consecutiveSymbols);
    type = (pairs[0][0] === pairs[1][0]) ? TWO_PAIR : FULL_HOUSE;
  }

  return type
}

module.exports = {
  part1,
  part2
}