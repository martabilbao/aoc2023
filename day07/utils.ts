import * as fs from 'fs';

export function readInput(inputPath: string): { [key: string]: {handCards: string[], handBid: number} } {
  const content = fs.readFileSync(inputPath, 'utf-8');
  const lines = content.split('\n');

  const input: {[key: string]: {handCards: string[], handBid: number}} = {};

  lines.forEach(line => {
    const hand = line.trim().split(/\s+/).map(String);
    const handString = hand[0]
    console.log({hand})
    input[handString] = {
      handCards: hand[0].split(''),
      handBid: Number(hand[1])
    };
  });

  return input;
}
