import path from "path";
import { readInput } from "./utils";

const inputPath = path.join(__dirname, 'input.txt')
const input = readInput(inputPath);

const inputArray = Object.values(input);
let inputPointsPerHand: number[] = [];

//A is the strongest. 2 is the weakest
const CARDSTRENGTH = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'];
const mapHandAndCardValues: Record<string, number[]> = {};

const countCards = (cards: string[]): { [key: string]: number } => {
  const cardCount: { [key: string]: number } = {};
  for (const card of cards) {
    if (cardCount[card]) {
      cardCount[card] = cardCount[card] + 1;
    } else {
      cardCount[card] = 1;
    }
  }

  return cardCount;
}

const customSort = (a: string, b: string) => {
  let index = 0;

  while (index < a.length || index < b.length) {
    const charA = a[index]; 
    const charB = b[index];
    
    const indexA = CARDSTRENGTH.indexOf(charA);
    const indexB = CARDSTRENGTH.indexOf(charB);
        
    if (indexA < indexB) {
      return -1;
    } else if (indexA > indexB) {
      return 1;
    } 
    index++;
  }

  return 0;
}

for (const hand of inputArray) {
  const mappedCards = countCards(hand.handCards);
  const handCards = hand.handCards.join('');
  mapHandAndCardValues[handCards] = Object.values(mappedCards).sort((a,b) => b - a);
}; 

const array = Object.entries(mapHandAndCardValues);
const fiveOfAKind = array.filter((el) => el[1][0] === 5).map(el => el[0]);
const fourOfAKind = array.filter((el) => el[1][0] === 4).map(el => el[0]);
const fullHouse = array.filter((el) => el[1][0] === 3 && el[1][1] === 2).map(el => el[0]);
const threeOfAKind = array.filter((el) => el[1][0] === 3 && el[1][1] !== 2).map(el => el[0]);
const twoPair = array.filter((el) => el[1][0] === 2 && el[1][1] == 2).map(el => el[0]);
const onePair = array.filter((el) => el[1][0] === 2 && el[1][1] !== 2).map(el => el[0]);
const highCard = array.filter((el) => el[1][0] === 1).map(el => el[0]);

if(fiveOfAKind.length !== 1 || fourOfAKind.length !== 1 || fullHouse.length !== 1 || threeOfAKind.length !== 1 ||
  twoPair.length !== 1 || onePair.length !== 1 || highCard.length !== 1){
  fiveOfAKind.sort(customSort);
  fourOfAKind.sort(customSort);
  fullHouse.sort(customSort);
  threeOfAKind.sort(customSort);
  twoPair.sort(customSort);
  onePair.sort(customSort);
  highCard.sort(customSort);
}

const sortedList = [...fiveOfAKind, ...fourOfAKind, ...fullHouse, ...threeOfAKind, ...twoPair, ...onePair, ...highCard].reverse();

sortedList.forEach((hand, idx) => {
  const rank = idx + 1;
  const handBid = input[hand].handBid;
  const points = rank * handBid;
  inputPointsPerHand.push(points);
});

const result = inputPointsPerHand.reduce((acc, cur) => {
  return acc + cur; 
});

console.log({result});

