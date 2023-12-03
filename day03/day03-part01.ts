import path from "path";
import { readInput } from "./utils";

const inputPath = path.join(__dirname, 'input.txt')
const input = readInput(inputPath);

const INPUT_MAX_WIDTH = input[0].length;
const INPUT_MAX_HEIGHT = input.length;

const result: number[] = [];

const isANumber = (char: string) => {
    return !Number.isNaN(Number(char));
}

const isASymbol = (char: string) => {
  return !isANumber(char) && char !== ".";
}

const neighbourCoordinates = (row: number, col: number, length: number) => {
	const neighbours: number[][] = [];

	const directions: number[][] = [];
	const rowDirections = [-1, 0, 1];

	rowDirections.forEach(rowDirection => {
		for (let x = -1; x < length + 1; x++) {
			const columnDirection = x;
			directions.push([rowDirection, columnDirection]);
		}
	});

	for (const [dx, dy] of directions) {
		const newRow = row + dx;
		const newCol = col + dy; 

		const isNewRowWithinLimits = newRow >= 0 && newRow <= INPUT_MAX_HEIGHT - 1;
		const isNewColumnWithinLimits = newCol >= 0 && newCol<= INPUT_MAX_WIDTH - 1;

		if (isNewRowWithinLimits && isNewColumnWithinLimits) {
			neighbours.push([newRow, newCol]);
		} else {
			continue;
		} 
	}
	return neighbours;	
}

type CurrentNumberRecord = {
	digits: string[],
	coordinates: number[],
}

for (let i = 0; i < INPUT_MAX_HEIGHT; i++) {
  const currentNumber: CurrentNumberRecord = {
      digits: [],
      coordinates: [],
  }

  for (let j = 0; j < INPUT_MAX_WIDTH; j++){
    const currentChar = input[i][j];

    if (isANumber(currentChar)) {
      currentNumber.digits.push(currentChar);
			if (currentNumber.digits.length === 1) {
				currentNumber.coordinates[0] = i;
				currentNumber.coordinates[1] = j;
			}
    }
		
		const isCharAtTheEndOfTheLine = j === INPUT_MAX_WIDTH - 1;
		
		if (((!isANumber(currentChar)) || isCharAtTheEndOfTheLine) && currentNumber.digits.length !== 0) {
			const neighbourPositions = neighbourCoordinates(currentNumber.coordinates[0], currentNumber.coordinates[1], currentNumber.digits.length);
			
			for (const position of neighbourPositions) {
				if (isASymbol(input[position[0]][position[1]])) {
					const numberWithAdjacentSymbol = Number(currentNumber.digits.join(""));
					result.push(numberWithAdjacentSymbol);
					break;
				} else {
					continue;
				}
			}
			
			currentNumber.digits.splice(0, currentNumber.digits.length);
			currentNumber.coordinates.splice(0, currentNumber.coordinates.length);
    } else {
    	continue;
    }
  }
};

const fullResult = result.reduce((acc, cur) => {
	return acc + cur;
}, 0);

console.log({ fullResult });

