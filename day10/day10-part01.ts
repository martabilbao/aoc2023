import path from "path";
import { readInput } from "./utils";

const inputPath = path.join(__dirname, 'input.txt')
const input = readInput(inputPath);

/**
 * Map: where to go based on where you are coming from (n, s, e, w)
 */
const pipeDirections: Record<string, (number[] | null)[]> = {
  '|': [ [-1, 0], [1, 0], null, null ],
  '-': [ null, null, [0, 1], [0, -1] ],
  'L': [ null, [0, 1], null , [-1, 0] ],
  '7': [ [0, -1], null, [1, 0], null],
  'J': [ null, [0, -1], [-1, 0], null ],
  'F': [ [0, 1], null, null, [1, 0] ]
}

/**
 * Get direction based on 2 positions
 */
const getDirection = (pipe1Position: number[], pipe2Position: number[]) => {
  const i = pipe2Position[0] - pipe1Position[0];
  const j = pipe2Position[1] - pipe1Position[1];
  return [i, j];
}

/**
 * Given one direction, get next pipe direction 
 */
const getPipeDirectionIndex = (direction: number[]) => {
  if (direction[0] === -1 && direction[1] === 0) return 0;
  if (direction[0] === 1 && direction[1] === 0) return 1;
  if (direction[0] === 0 && direction[1] === 1) return 2;
  if (direction[0] === 0 && direction[1] === -1) return 3;
}

type PipeCharPositionAndDirectionType = {
  pipeChar: string;
  pipePosition: number[];
  pipeDirection: number[];
}

/**
 * Get first pipe character, position and direction
 */
const getFirstPipeCharPositionAndDirection = () => {
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
      if(input[i][j] === "S"){
        const startingPosition = [i, j];
        if (input[i][j+1] === '-' || input[i][j+1] === '7'){
          return {
            pipePosition: [i, j+1],
            pipeChar: input[i][j+1],
            pipeDirection: getDirection(startingPosition, [i, j+1])
          }
        } else if (input[i+1][j] === '|' || input[i+1][j] === 'J' || input[i+1][j] === 'L') {
          return{
            pipePosition: [i+1, j],
            pipeChar: input[i+1][j],
            pipeDirection: getDirection(startingPosition, [i+1, j])
          }
        } else if (input[i][j-1] === '-' || input[i][j-1] === 'F' ) {
          return{
            pipePosition: [i, j-1],
            pipeChar: input[i][j-1],
            pipeDirection: getDirection(startingPosition, [i, j-1])
          }
        } else if (input[i-1][j] === '|' || input[i-1][j] === '7' || input[i-1][j] === 'F') {
          return{
            pipePosition: [i-1, j],
            pipeChar: input[i-1][j],
            pipeDirection: getDirection(startingPosition, [i-1, j])
          }
        } 
      }
    }
  }
  throw new Error('This should never happen');
};

const firstPipe = getFirstPipeCharPositionAndDirection();
let outNextPipeChar = firstPipe.pipeChar;
let outNextPipePosition = firstPipe.pipePosition;
let outNextPipeDirection = firstPipe.pipeDirection;
let outAcc = 0

const followPipeLoop = (firstPipeElement: PipeCharPositionAndDirectionType) => {
  const {pipeChar, pipePosition, pipeDirection} = firstPipeElement;
  
  const i = pipePosition[0];
  const j = pipePosition[1];
  const directionIdx = getPipeDirectionIndex(pipeDirection);
  
  if (directionIdx === undefined) return;

  const nextPipeDirection = pipeDirections[pipeChar][directionIdx];
  
  if (nextPipeDirection === null) return;

  const nextPipePosition = [i+nextPipeDirection[0], j+nextPipeDirection[1]];
  const nextPipeChar = input[nextPipePosition[0]][nextPipePosition[1]];
  
  if (nextPipeChar === 'S' ) {
    outNextPipeChar = nextPipeChar;
    console.log({value: Math.ceil((outAcc+1)/2)})
    return;
  }

  outAcc = outAcc + 1;
  outNextPipeChar = nextPipeChar;
  outNextPipePosition = nextPipePosition;
  outNextPipeDirection = nextPipeDirection;
}

while(outNextPipeChar !== 'S'){
  followPipeLoop({
    pipePosition: outNextPipePosition, 
    pipeChar: outNextPipeChar, 
    pipeDirection: outNextPipeDirection
  })
}

