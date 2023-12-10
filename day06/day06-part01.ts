import path from "path";
import { readInput } from "./utils";

const inputPath = path.join(__dirname, 'input.txt')
const input = readInput(inputPath);

const numberOfDifferentWaysOfWinningPerRace: number[] = [];

input.forEach(race => {
  let timeHoldingButton = 1; //ms
  let numberOfTimesTheRaceRecordIsBitten = 0;
  
  while(timeHoldingButton < race.time){
    const speed = timeHoldingButton; // mm/ms
    const remainingTime = race.time - timeHoldingButton;
    const distanceTravelledInRemainingTime = remainingTime * speed;
    if(distanceTravelledInRemainingTime > race.distance) {
      numberOfTimesTheRaceRecordIsBitten = numberOfTimesTheRaceRecordIsBitten + 1;
    }
    timeHoldingButton = timeHoldingButton + 1;
  }

  numberOfDifferentWaysOfWinningPerRace.push(numberOfTimesTheRaceRecordIsBitten)
  
});

const result = numberOfDifferentWaysOfWinningPerRace.reduce((acc, cur) => {
  return acc * cur;
});

console.log({numberOfDifferentWaysOfWinningPerRace, result});
