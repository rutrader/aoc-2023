const calc = require('./calc');

describe('AOC 2023: Day 3', () => {
    test('Part 1', async () => {
        const result = await calc.part1('input.txt');

        expect(result).toBe(550064);
    })

    test('Part 2', async () => {
        const result = await calc.part2('input.txt');
        expect(result).toBe(85010461)
    })
})
