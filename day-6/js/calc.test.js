const calc = require('./calc');
const readFile = require('../../utils/js/readFile')

describe('AOC 2023: Day 6', () => {
  let lines = [];

  beforeEach(async () => {
    lines = await readFile('input', 'day-6');
  });

  test('Part 1', async () => {
    const result = calc.part1(lines);
    expect(result).toBe(3316275);
  })

  test('Part 2', async () => {
    const result = calc.part2(lines);
    expect(result).toBe(27102791)
  })
})
