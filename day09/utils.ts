import fs from 'fs';

// Function to convert input string to an array of arrays
const convertInputToArrayOfNumbers = (input: string): number[][] => {
  return input.trim().split('\n').map(row => row.split(' ').map(char => Number(char)));
}

export function readInput(inputPath: string) {
  // Read the content of input.txt file
  const filePath = inputPath; // Adjust the path as per your directory structure
  
	const inputData: string = fs.readFileSync(filePath, 'utf-8');
	const arrayOfArrays: number[][] = convertInputToArrayOfNumbers(inputData);

	if (arrayOfArrays) {
		return arrayOfArrays
	} else {
		return [];
	}
}