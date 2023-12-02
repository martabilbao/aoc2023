import path from "path";
import { createInputFileReadLineInterface } from "../utils"

const input = createInputFileReadLineInterface(path.join(__dirname, 'input.txt'));

const NUMBERS: Record<string, number> = {
  zero: 0,
  one: 1, 
  two: 2, 
  three: 3, 
  four: 4, 
  five: 5, 
  six: 6, 
  seven: 7, 
  eight: 8, 
  nine: 9, 
}
let result = 0;

input.on("line", (newLineFromInput) => {
  let firstNumber = "";
  let lastNumber = "";

  const numberKeys = Object.keys(NUMBERS);
  const initialSearchString = "";
  let searchString = initialSearchString;

  //Search the string from left to right
  for (let index = 0; index < newLineFromInput.length; index++) {
    searchString = `${searchString}${newLineFromInput[index]}`
    
    for (const character of searchString) {
      const isCharacterANumber = !Number.isNaN(Number(character))
      if(isCharacterANumber){
        firstNumber = character;
        break; 
      }
    }
    
    if(firstNumber !== ""){
      searchString = initialSearchString;
      break;
    }
    
    for (const number of numberKeys) {
      if(searchString.includes(number)){
        firstNumber = String(NUMBERS[number])
        break;
      }
    }  
    
    if(firstNumber !== ""){
      searchString = initialSearchString;
      break;
    } 
  }

  //Search the string from right to left
  for (let index = newLineFromInput.length - 1; index >= 0; index--) {
    searchString = `${newLineFromInput[index]}${searchString}`
    
    for (const character of searchString) {
      const isCharacterANumber = !Number.isNaN(Number(character))
      if(isCharacterANumber){
        lastNumber = character;
        break; 
      }
    }
    
    if(lastNumber !== ""){
      searchString = initialSearchString;
      break;
    }
    
    for (const number of numberKeys) {
      if(searchString.includes(number)){
        lastNumber = String(NUMBERS[number])
        break;
      }
    }  
    
    if(lastNumber !== ""){
      searchString = initialSearchString;
      break;
    } 
  }

  const lineValue = Number(`${firstNumber}${lastNumber}`)

  result = result + lineValue;
});

input.on("close", () => {
  console.log({ result });
});