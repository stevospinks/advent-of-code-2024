import { Day } from './day';
import day0 from './day0/index';
import day1 from './day1/index';
import day2 from './day2/index';
// MORE IMPORTS HERE

const days: Day[] = [
  day0,
  day1,
  day2,
  // MORE DAYS HERE
];

async function runDay(dayId: number) {
  console.time('runtime');
  const resultPart1 = await days[dayId].partOne();
  console.log('Part 1 result:', resultPart1);
  console.timeEnd('runtime');

  console.log('');

  console.time('runtime');
  const resultPart2 = await days[dayId].partTwo();
  console.log('Part 2 result:', resultPart2);
  console.timeEnd('runtime');

  console.log('');
}

console.log('🎄 ADVENT OF CODE 2024 🎄\n');
const params = process.argv.splice(2);
if (params.length) {
  runDay(parseInt(params[0], 10));
} else {
  console.log(`Usage: npm run start [day]`);
  console.log(`Available days: [ ${days.map((x) => x.id).join(', ')} ]`);
}
