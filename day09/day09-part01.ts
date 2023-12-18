import path from "path";
import { readInput } from "./utils";

const inputPath = path.join(__dirname, 'input.txt')
const dataset = readInput(inputPath);

const isPredictionAllZeros = (prediction: number[]) => {
  return prediction.every((e) => e === 0);
}

const foo = (array: number[], sum: number): number => {
  if(isPredictionAllZeros(array)){
    return sum;
  }

  const reducedArray: number[] = [];

  for (let i = 0; i < array.length - 1 ; i++) {
    const currentValue = array[i];
    const nextValue = array[i + 1];

    const substraction = nextValue - currentValue;
    reducedArray.push(substraction);
  };

  return foo(reducedArray, sum + array[array.length-1]);
}

const totalSum = dataset.reduce((acc, cur) => {
  return acc + foo(cur, 0);
}, 0);

console.log({totalSum});