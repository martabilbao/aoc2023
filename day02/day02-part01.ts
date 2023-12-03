import path from "path";
import { createInputFileReadLineInterface } from "../utils"

const input = createInputFileReadLineInterface(path.join(__dirname, 'input.txt'));

let result = 0;

const LIMITATIONS: Record<string, number> = {
  red: 12, 
  blue: 14, 
  green: 13
}

const getGameID = (gameLine: string) => {
  const spaceIndex = gameLine.indexOf(' ');
  const colonIndex = gameLine.indexOf(':');

  if (spaceIndex !== -1 && colonIndex !== -1 && spaceIndex < colonIndex) {
    return Number(gameLine.substring(spaceIndex + 1, colonIndex))
  }else {
    return 0;
  }
}

input.on("line", (newLineFromInput) => {
  const gameID = getGameID(newLineFromInput);

  const gameListInput = newLineFromInput.split(":")[1];
  const sets = gameListInput.split(";");
  let isGameInvalid = false;

  for (const set of sets) {
    const subsets = set.split(",");
    for (const subset of subsets) {
      const numberColorDuo = subset.trimStart().split(" ");

      isGameInvalid = (() => {
        const numberOfCubes = Number(numberColorDuo[0]);
        const colorOfCubes = numberColorDuo[1];
        return numberOfCubes > LIMITATIONS[colorOfCubes];
      })();

      if(isGameInvalid) {
        break;
      }
    };
    if(isGameInvalid) {
      break;
    }
  };
  if(!isGameInvalid) {
    result = result + gameID;
  }
});

input.on("close", () => {
  console.log({ result });
});