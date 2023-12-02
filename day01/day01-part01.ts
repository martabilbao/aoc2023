import path from "path";
import { createInputFileReadLineInterface } from "../utils"

const input = createInputFileReadLineInterface(path.join(__dirname, 'input.txt'));

let result = 0;

input.on("line", (newLineFromInput) => {
  let lineValue = 0;
  const lineCharacters = newLineFromInput.split("");
  const numbersFromArray = lineCharacters.filter(character => {
    const castedCharacter = Number(character);
    return !Number.isNaN(castedCharacter);
  });

  if(numbersFromArray.length === 1){
    lineValue = Number(`${numbersFromArray[0]}${numbersFromArray[0]}`);
  }

  if(numbersFromArray.length > 1){
    const firstNumber = Number(numbersFromArray.shift());
    const lastNumber = Number(numbersFromArray.pop());
    lineValue = Number(`${firstNumber}${lastNumber}`);
  }

  console.log({lineValue})
  result = result + lineValue;
});

input.on("close", () => {
  console.log({ result });
});