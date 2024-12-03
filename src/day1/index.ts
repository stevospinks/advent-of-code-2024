import { Day } from '../day';
import { StringParser } from '../utils/string-parser';

class Day1 extends Day {
  constructor() {
    super(1);
  }

  solveForPartOne(input: string): string {
    const [a1, a2] = StringParser.ToNumberArray(input, '   ');
    a1.sort();
    a2.sort();
    let result = 0;
    while (a1.length > 0) {
      const v1 = a1.pop() ?? 0;
      const v2 = a2.pop() ?? 0;
      result += v1 > v2 ? v1 - v2 : v2 - v1;
    }
    return result.toString();
  }

  solveForPartTwo(input: string): string {
    const [a1, a2] = StringParser.ToNumberArray(input, '   ');

    const result = a1.reduce((acc, cur) => {
      const curCount = a2.filter((n) => n === cur).length;
      acc += cur * curCount;
      return acc;
    }, 0);

    return result.toString();
  }
}

export default new Day1();
