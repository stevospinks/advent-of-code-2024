import day1 from './index';

const example = `3   4
4   3
2   5
1   3
3   9
3   3`;

describe('On Day 1', () => {
  it(`part 1 solves for the example input`, () => {
    expect(day1.solveForPartOne(example)).toBe('11');
  });

  xit(`part 2 solves for the example input`, () => {
    expect(day1.solveForPartTwo(example)).toBe('hello');
  });
});
