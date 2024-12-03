import { Day } from '../day';
import { StringParser } from '../utils/string-parser';

class Day2 extends Day {
  constructor() {
    super(2);
  }

  solveForPartOne(input: string): string {
    const data = StringParser.To2dMatrix(input, ' ').map((d) => d.map((r) => parseInt(r)));
    const result = data.filter(this.isSafe);
    return result.length.toString();
  }

  isSafe(report: number[]): boolean {
    const result = report.reduce(
      (acc: { safe: boolean; dir: 'u' | 'd' | '' }, level: number, i: number, arr: number[]) => {
        if (i === 0 || !acc.safe) {
          return acc;
        }

        const prevLevel = arr[i - 1];
        if (level === prevLevel) {
          acc.safe = false;
          return acc;
        }

        if (level < prevLevel) {
          if (acc.dir === 'u') {
            acc.safe = false;
            return acc;
          }
          acc.dir = 'd';
          acc.safe = prevLevel - level <= 3;
          return acc;
        }

        // level must be > prevLevel
        if (acc.dir === 'd') {
          acc.safe = false;
          return acc;
        }
        acc.dir = 'u';
        acc.safe = level - prevLevel <= 3;
        return acc;
      },
      { safe: true, dir: '' },
    );

    return result.safe;
  }

  solveForPartTwo(input: string): string {
    return input;
  }
}

export default new Day2();
