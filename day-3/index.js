import * as fs from "fs";

const getData = () => {
  const rawString = fs.readFileSync("./inputData.txt").toString();
  const dataArr = rawString.split(/\r?\n/);
  return dataArr;
};

const getPriority = (char) => {
  return char === char.toLowerCase()
    ? char.charCodeAt() - "a".charCodeAt() + 1
    : char.charCodeAt() - "A".charCodeAt() + 27;
};

const getSumOfItemsByPriority = () => {
  const items = getData();

  const total = items
    .map((item) => {
      const firstHalf = item.substring(0, item.length / 2);
      const secondHalf = item.substring(item.length, item.length / 2);
      const common = firstHalf
        .split("")
        .filter((char) => secondHalf.includes(char));
      return getPriority(common[0]);
    })
    .reduce((prev, curr) => prev + curr);
  return total;
};

const getSumOfItemsByGroup = () => {
  const items = getData();
  const sacks = items.reduce(function (result, value, index, array) {
    if (index % 3 === 0)
      result.push(array.slice(index, index + 3).map((lines) => [...lines]));
    return result;
  }, []);

  const total = sacks
    .map((sack) => {
      let intersection = sack[0];
      [...sack].slice(1).forEach((item) => {
        intersection = intersection.filter((char) => item.includes(char));
      });
      return getPriority(intersection[0]);
    })
    .reduce((prev, curr) => prev + curr);

  return total;
};

console.log(getSumOfItemsByPriority());
console.log(getSumOfItemsByGroup());
