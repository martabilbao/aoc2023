import path from "path";
import { readInput } from "./utils";

const inputPath = path.join(__dirname, 'input.txt')
const universe = readInput(inputPath);

const transposeMatrix = (matrix: string[][]) => {
  const transposedMatrix: string[][] = [];

  for (let i = 0; i < matrix[0].length; i++) {
    transposedMatrix.push([])
  }

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      transposedMatrix[j][i] = matrix[i][j];
    }
  }

  return transposedMatrix;
}

const duplicateRowsWithNoGalaxies = (matrix: string[][]) => {
  const matrixWithDuplicatedRows: string[][] = [];
  matrix.forEach(row => {
    matrixWithDuplicatedRows.push(row);
    if (!row.includes('#')) {
      matrixWithDuplicatedRows.push(row);
    }
  });

  return matrixWithDuplicatedRows;
}

const getExpandedUniverse = (matrix: string[][]) => {
  const columnsToRowsArray = transposeMatrix(matrix);
  const expandedTransposedArray = duplicateRowsWithNoGalaxies(columnsToRowsArray);
  const rowsToColumsArray = transposeMatrix(expandedTransposedArray);
  const expandedArray = duplicateRowsWithNoGalaxies(rowsToColumsArray);

  return expandedArray;
}

const assignNumbersToGalaxies = (matrix: string[][]) => {
  let value = 1;
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] === '#') {
        matrix[i][j] = String(value);
        value++;
      }
    }
  }
}

const expandedUniverse = getExpandedUniverse(universe);
assignNumbersToGalaxies(expandedUniverse);


console.table(expandedUniverse);