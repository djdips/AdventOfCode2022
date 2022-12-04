import * as fs from "fs";

// .234.....  2-4
// .....678.  6-8

// .23......  2-3 x[0] <= y[0] && x[1] <= y[1]
// ...45....  4-5

// ....567..  5-7
// ......789  7-9

// .2345678.  2-8
// ..34567..  3-7

// .....6...  6-6
// ...456...  4-6

// .23456...  2-6
// ...45678.  4-8

const getData = () => {
  const rawString = fs.readFileSync("./inputData.txt").toString();
  const dataArr = rawString
    .split(/\r?\n/)
    .map((line) => line.split(",").map((num) => num.split("-").map(Number)));
  return dataArr;
};

const getFullOverlaps = () => {
  const sections = getData();
  let overlap = 0;

  sections.forEach((section) => {
    const [first, second] = section;
    if (
      (first[0] >= second[0] && first[1] <= second[1]) ||
      (first[0] <= second[0] && first[1] >= [second[1]])
    ) {
      overlap++;
    }
  });

  return overlap;
};

const getPartialOverlaps = () => {
  const sections = getData();
  let overlap = 0;

  sections.forEach((section) => {
    const [first, second] = section;
    if (first[0] <= second[1] && second[0] <= first[1]) {
      overlap++;
    }
  });

  return overlap;
};

console.log(getFullOverlaps());
console.log(getPartialOverlaps());
