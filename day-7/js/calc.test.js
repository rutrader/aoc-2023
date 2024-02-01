const calc = require('./calc');
const readFile = require('../../utils/js/readFile')

describe('AOC 2023: Day 7', () => {
  let lines = [];

  beforeEach(async () => {
    lines = await readFile('input', 'day-7');
  });

  test('Part 1', async () => {
    const result = calc.part1(lines);
    expect(result).toBe(248105065);
  })

  test('Part 2', async () => {
    const result = calc.part2(lines);
    expect(result).toBe(249515436)
  })
})
