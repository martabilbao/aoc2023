import path from "path";
import { readInput } from "./utils";

const inputPath = path.join(__dirname, 'input.txt');
const input: {instructions: string[], networkMap: Record<string, Record<string, string>>}  = readInput(inputPath);

const {instructions, networkMap} = input;
const firstNode = 'AAA';
const lastNode = 'ZZZ';

let currentNode = firstNode;
let isLastNode = false;

let currentInstructionIdx = 0;
let numberOfSteps = 0;

while (!isLastNode) {
  if (currentNode === lastNode) {
    isLastNode = true;
    break;
  } else {

    const currentInstruction = instructions[currentInstructionIdx];
    const nextNode = networkMap[currentNode][currentInstruction];  
    currentNode = nextNode;
  
    if (currentInstructionIdx === instructions.length - 1) {
      currentInstructionIdx = 0;
    } else {
      currentInstructionIdx = currentInstructionIdx + 1;
    }
    
    numberOfSteps = numberOfSteps + 1;
  } 
}

console.log({numberOfSteps});