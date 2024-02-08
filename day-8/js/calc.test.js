const calc = require('./calc');
const readFile = require('../../utils/js/readFile')

describe('AOC 2023: Day 8', () => {
  let lines = [];

  beforeEach(async () => {
    lines = await readFile('input', 'day-8');
  });

  test('Part 1', async () => {
    const result = calc.part1(lines);
    expect(result).toBe(24253);
  })

  test('Part 2', async () => {
    const result = calc.part2(lines);
    expect(result).toBe(12357789728873)
  })
})
