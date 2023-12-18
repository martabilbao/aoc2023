import * as fs from 'fs';

export function readInput(inputPath: string): { instructions: string[], networkMap: Record<string, Record<string, string>> } {
  const content = fs.readFileSync(inputPath, 'utf-8');
  const lines = content.split('\n');

  let instructions: string[] = [];
  const networkMap: Record<string, Record<string, string>> = {};

  for (const [idx, line] of lines.entries()) {
    if (idx === 0) {
      instructions = line.trim().split('');
    } else if (line === '') {
      continue;
    }else {
      const [key, values] = line.split(' = ');
      const [left, right] = values.substring(1, values.length - 1).split(', ');

      networkMap[key.trim()] = { L: left, R: right };
    }
  };
  
  return {
    instructions,
    networkMap
  };
}
