import * as fs from 'fs';

export function readInput(inputPath: string): { time: number; distance: number }[] {
  const content = fs.readFileSync(inputPath, 'utf-8');
  const lines = content.split('\n');

  const input: { time: number; distance: number }[] = [];

  if (lines.length === 2) {
    const timeValues = lines[0].trim().split(/\s+/).map(Number);
    const distanceValues = lines[1].trim().split(/\s+/).map(Number);

    if (timeValues.length === distanceValues.length) {
      for (let i = 1; i < timeValues.length; i++) {
        input.push({
          time: timeValues[i],
          distance: distanceValues[i],
        });
      }
    } else {
      throw new Error('Number of time values does not match number of distance values.');
    }
  } else {
    throw new Error('Invalid input format. Expected two lines in the input file.');
  }

  return input;
}
