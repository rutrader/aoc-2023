const calc = require('./calc');
const readFile = require('../../utils/js/readFile')
const {MESSAGE_USE_PHP} = require("../../utils/js/contstants");

describe('AOC 2023: Day 5', () => {
    let lines = [];

    beforeEach(async () => {
        lines = await readFile('input', 'day-5');
    });

    test('Part 1', async () => {
        const result = calc.part1(lines);
        expect(result).toBe(214922730);
    })

    test('Part 2', async () => {
        const result = calc.part2(lines);
        expect(result).toBe(MESSAGE_USE_PHP)
    })
})
