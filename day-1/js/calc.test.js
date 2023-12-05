const calc = require('./calc');

describe('AOC 2023: Day 1', () => {
  test('part 1', async () => {
    const result = await calc.sumOfFilteredNumbers('input.txt');
    expect(result).toBe(55477);
  });

  test('part 2', async () => {
    const result = await calc.part2('input.txt');

    expect(result).toBe(54431);
  });

});
