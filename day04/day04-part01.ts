import path from "path";
import { createInputFileReadLineInterface } from "../utils";


const input = createInputFileReadLineInterface(path.join(__dirname, 'input.txt'));

let listOfCardValues: number[] = [];

input.on("line", (newLineFromInput) => {
	let myWinningNumbers = 0;
	let cardValue = 0;

	const colonIndex = newLineFromInput.indexOf(":")
	const separatorIndex = newLineFromInput.indexOf("|")
	const winningNumbers = newLineFromInput.slice(colonIndex + 1, separatorIndex).split(" ").filter((el) => el !== "");
	const myNumbers = newLineFromInput.slice(separatorIndex + 1, newLineFromInput.length).split(" ").filter((el) => el !== "");

	winningNumbers.forEach(winningNumber => {
		if (myNumbers.includes(winningNumber)) {
			myWinningNumbers = myWinningNumbers + 1;
		}
	});

	if (myWinningNumbers === 0) {
		cardValue = 0;
	} else if (myWinningNumbers === 1) {
		cardValue = 1;
	} else {
		cardValue = Math.pow(2, myWinningNumbers - 1);
	}

	listOfCardValues.push(cardValue);
});


input.on("close", () => {
	const result = listOfCardValues.reduce((acc, cur) => {
		return acc + cur;
	}, 0);
	
	console.log({ result });
});

