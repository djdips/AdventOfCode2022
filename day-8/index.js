import * as fs from "fs";

const getData = () => {
  const rawString = fs.readFileSync("./inputData.txt").toString();
  const dataArr = rawString
    .split(/\r?\n/)
    .map((lines) => lines.split("").map(Number));
  return dataArr;
};

const visible = new Set();

//    1 2 3 4 5
//  1 3 0 3 7 3
//  2 2 5 5 1 2
//  3 6 5 3 3 2
//  4 3 3 5 4 9
//  5 3 5 3 9 0

const setVisible = (y, x) => {
  visible.add(`${y}-${x}`);
};

const checkRows = (x, y, reverse, matrix, score = false) => {
  setVisible(y, x);

  let maxHeight = matrix[y][x];
  let step = reverse ? -1 : 1;
  let inView = 0;

  while (true) {
    x += step;
    if (y < 0 || y >= matrix.length || x < 0 || x >= matrix[y].length) {
      break;
    }

    inView++;

    if (matrix[y][x] > maxHeight) {
      maxHeight = matrix[y][x];
      setVisible(y, x);
    }
  }

  return inView;
};

const checkColumns = (x, y, reverse, matrix, score = false) => {
  setVisible(y, x);

  let maxHeight = matrix[y][x];
  let step = reverse ? -1 : 1;
  let inView = 0;

  while (true) {
    y += step;
    if (y < 0 || y >= matrix.length || x < 0 || x >= matrix[y].length) {
      break;
    }

    inView++;

    if (matrix[y][x] > maxHeight) {
      maxHeight = matrix[y][x];
      setVisible(y, x);
    }
  }
  return inView;
};

const traverseMatrix = (x, y, reverse = false, row = false, matrix) => {
  setVisible(y, x);

  let maxHeight = matrix[y][x];
  let step = reverse ? -1 : 1;
  let stepX = row ? step : 0;
  let stepY = !row ? step : 0;

  while (true) {
    y += stepY;
    x += stepX;

    if (y < 0 || y >= matrix.length || x < 0 || x >= matrix[y].length) {
      break;
    }

    if (matrix[y][x] > maxHeight) {
      maxHeight = matrix[y][x];
      setVisible(y, x);
    }
  }
};

const traverseMatrixScore = (x, y, reverse = false, row = false, matrix) => {
  let maxHeight = matrix[y][x];
  let step = reverse ? -1 : 1;
  let stepX = row ? step : 0;
  let stepY = !row ? step : 0;
  let inView = 0;

  while (true) {
    y += stepY;
    x += stepX;

    if (y < 0 || y >= matrix.length || x < 0 || x >= matrix[y].length) {
      break;
    }

    inView++;

    if (matrix[y][x] >= maxHeight) {
      break;
    }
  }
  return inView;
};

const getVisibleFromOutside = () => {
  const matrix = getData();
  const rowLength = matrix[0].length;

  for (let i = 0; i < rowLength; i++) {
    traverseMatrix(i, 0, false, false, matrix);
    traverseMatrix(i, matrix.length - 1, true, false, matrix);
  }

  for (let i = 0; i < matrix.length; i++) {
    traverseMatrix(0, i, false, true, matrix);
    traverseMatrix(rowLength - 1, i, true, true, matrix);
  }

  return visible.size;
};

const getScenicScore = () => {
  const matrix = getData();
  const rowLength = matrix[0].length;

  let scores = [];

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < rowLength; j++) {
      const score =
        traverseMatrixScore(i, j, false, false, matrix) *
        traverseMatrixScore(i, j, true, false, matrix) *
        traverseMatrixScore(i, j, false, true, matrix) *
        traverseMatrixScore(i, j, true, true, matrix);
      scores.push(score);
    }
  }
  console.log(scores);
  return Math.max(...scores);
};

console.log(getData());
console.log(getVisibleFromOutside());
console.log(getScenicScore());
