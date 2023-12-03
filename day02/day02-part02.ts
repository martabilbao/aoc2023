import path from "path";
import { createInputFileReadLineInterface } from "../utils"

const input = createInputFileReadLineInterface(path.join(__dirname, 'input.txt'));

let result = 0;

input.on("line", (newLineFromInput) => {
  const gameListInput = newLineFromInput.split(":")[1];
  const sets = gameListInput.split(";");

  let gamePower = 0;
  let minNumberOfCubesThatMakeTheGamePossible: Record<string, number> = {
    red: 0, 
    blue: 0, 
    green: 0
  }

  for (const set of sets) {
    const subsets = set.split(",");
    for (const subset of subsets) {
      const numberColorDuo = subset.trimStart().split(" ");
      const numberOfCubes = Number(numberColorDuo[0]);
      const colorOfCubes = numberColorDuo[1];
      
      if(minNumberOfCubesThatMakeTheGamePossible[colorOfCubes] < numberOfCubes){
        minNumberOfCubesThatMakeTheGamePossible[colorOfCubes] = numberOfCubes;
      }else {
        continue;
      }
      
      const redCubes = minNumberOfCubesThatMakeTheGamePossible.red;
      const blueCubes = minNumberOfCubesThatMakeTheGamePossible.blue;
      const greenCubes = minNumberOfCubesThatMakeTheGamePossible.green;
      
      gamePower = redCubes * blueCubes * greenCubes;  
    };
  };
    result = result + gamePower;
});

input.on("close", () => {
  console.log({ result });
});