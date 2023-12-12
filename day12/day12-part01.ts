import path from "path";
import { createInputFileReadLineInterface } from "../utils"

const input = createInputFileReadLineInterface(path.join(__dirname, 'input.txt'));

const numberOfValidArrangementsPerLine: number[] = [];

const isCurrentArrangementPossible = (currentArrangement: string[], damagedSpringGroupSizes: number[]) => {
  if(currentArrangement.length !== damagedSpringGroupSizes.length){
    return false;
  }
  for (let i = 0; i < currentArrangement.length; i++) {
    if(currentArrangement[i].length !== damagedSpringGroupSizes[i]){
      return false;
    } else {
      continue;
    }
  }
  return true;
};

const generateArrangements = (spring: string) => {
  const result: string[] = [];
  
  const generate = (index: number, current: string) => {
    if (index === spring.length) {
      result.push(current);
      return;
    }

    if (spring[index] === '?') {
      generate(index + 1, current + '.'); // Replace '?' with '.'
      generate(index + 1, current + '#'); // Replace '?' with '#'
    } else {
      generate(index + 1, current + spring[index]); // Keep the original character
    }
  }

  generate(0, '');
  return result;
}

input.on("line", (newLineFromInput) => {
  const splitLine = newLineFromInput.split(' ');
  const springs = splitLine[0];
  const damagedSpringsGroupSizes = splitLine[1].split(',').map(el => Number(el));
    
  const possibleArrangements = generateArrangements(springs);
  
  let validArrangements = 0;
  for (const arrangement of possibleArrangements) {
    const damagedSpringsGroups = arrangement.split('.').filter(str => str !== '');
    if(isCurrentArrangementPossible(damagedSpringsGroups, damagedSpringsGroupSizes)){
      validArrangements++;
      continue;
    }
  }

  numberOfValidArrangementsPerLine.push(validArrangements);
});

input.on("close", () => {
  const result = numberOfValidArrangementsPerLine.reduce((acc, cur) => acc + cur);
  console.log({result})
});