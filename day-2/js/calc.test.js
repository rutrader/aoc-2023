const calc = require('./calc');

describe('AOC 2023: Day 2', () => {
    test('Part 1', async () => {
        const result = await calc.part1('input.txt');

        expect(result).toBe(2101);
    })

    test('Part 2', async () => {
        const result = await calc.part2('input.txt');
        expect(result).toBe(58269)
    })
})