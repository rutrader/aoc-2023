const calc = require('./calc');

describe('AOC 2023: Day 4', () => {
    let lines = [];

    beforeEach(async () => {
        lines = await calc.readFiles('input');
    });

    test('Part 1', async () => {
        const result = calc.part1(lines);
        expect(result).toBe(28538);
    })

    test('Part 2', async () => {
        const result = calc.part2(lines);
        expect(result).toBe(9425061)
    })
})
