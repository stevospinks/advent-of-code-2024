import { Day } from '../day';
import { StringParser } from '../utils/string-parser';

interface SafetyReport {
  dir: 'u' | 'd' | '';
  unsafeLocation: number;
}

class Day2 extends Day {
  constructor() {
    super(2);
  }

  solveForPartOne(input: string): string {
    const data = StringParser.To2dMatrix(input, ' ').map((d) => d.map((r) => parseInt(r)));
    const result = data.filter((d) => this.isSafe(d));
    return result.length.toString();
  }

  isSafe(report: number[], allowOneUnsafeRemoval = false): boolean {
    let result = report.reduce(
      (acc: SafetyReport, level: number, i: number, arr: number[]) => {
        if (i === 0 || acc.unsafeLocation >= 0) {
          return acc;
        }

        const prevLevel = arr[i - 1];
        if (level === prevLevel) {
          acc.unsafeLocation = i - 1;
          return acc;
        }

        if (level < prevLevel) {
          if (acc.dir === 'u') {
            acc.unsafeLocation = i - 1;
            return acc;
          }

          acc.dir = 'd';
          if (prevLevel - level > 3) {
            acc.unsafeLocation = i - 1;
          }

          return acc;
        }

        // level must be > prevLevel
        if (acc.dir === 'd') {
          acc.unsafeLocation = i - 1;
          return acc;
        }

        acc.dir = 'u';
        if (level - prevLevel > 3) {
          acc.unsafeLocation = i - 1;
        }

        return acc;
      },
      { dir: '', unsafeLocation: -1 },
    );

    const safe = result.unsafeLocation === -1;
    if (safe || !allowOneUnsafeRemoval) {
      return safe;
    }

    // Not safe, so check if it is when removing the current level.
    let splicedReport = [...report];
    splicedReport.splice(result.unsafeLocation, 1);

    if (this.isSafe(splicedReport, false)) {
      return true;
    }

    // Still not safe, so check if it is when removing the next level.
    if (report.length >= result.unsafeLocation) {
      splicedReport = [...report];
      splicedReport.splice(result.unsafeLocation + 1, 1);

      if (this.isSafe(splicedReport, false)) {
        return true;
      }
    }

    // Still not safe, so finally check if it is when removing the previous level.
    if (result.unsafeLocation !== 0) {
      splicedReport = [...report];
      splicedReport.splice(result.unsafeLocation - 1, 1);

      return this.isSafe(splicedReport, false);
    }

    return false;
  }

  solveForPartTwo(input: string): string {
    const data = StringParser.To2dMatrix(input, ' ').map((d) => d.map((r) => parseInt(r)));
    const result = data.filter((d) => this.isSafe(d, true));
    return result.length.toString();
  }
}

export default new Day2();
