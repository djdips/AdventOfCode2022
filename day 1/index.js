import * as fs from "fs";

const getCalorieData = () => {
  const rawString = fs.readFileSync("./inputData.txt").toString();
  const dataArr = rawString.split(/\r?\n/);

  let totalCalories = [];
  let sum = 0;

  for (let i = 0; i < dataArr.length; i++) {
    if (dataArr[i]) {
      sum = sum + Number(dataArr[i]);
    }
    if (!dataArr[i]) {
      totalCalories.push(sum);
      sum = 0;
    }
  }

  return totalCalories;
};

const getMaxCalorie = () => {
  const arr = getCalorieData();
  return Math.max(...arr);
};

const getTopThreeCalorie = () => {
  const arr = getCalorieData();
  return arr
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((prev, curr) => prev + curr);
};

console.log(getMaxCalorie());
console.log(getTopThreeCalorie());
