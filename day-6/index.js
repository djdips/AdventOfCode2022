import * as fs from "fs";

const getData = () => {
  const rawString = fs.readFileSync("./inputData.txt").toString();
  const dataArr = rawString.split(/\r?\n/).map((str) => str.split(""));
  return dataArr;
};

const getStartOfMarker = (input) => {
  const routines = getData();
  for (const routine of routines) {
    for (let i = 0; i < routine.length; i++) {
      const group = routine.slice(i, i + input);
      const unique = new Set(group).size;
      if (unique === input) {
        return i + input;
      }
    }
  }
};

console.log(getStartOfMarker(4));
console.log(getStartOfMarker(14));
