import * as fs from "fs";

const cycleDefinition = {
  noop: 1,
  addx: 2,
};

let signalMap = {};

const INSPECT_VALUE = 40;
const ROWS = 6;
const COLUMNS = 40;
const spriteWidth = 3;

const displayView = Array.from({ length: ROWS })
  .fill()
  .map(() => Array.from({ length: COLUMNS }).fill("."));

const getData = () => {
  const rawString = fs.readFileSync("./inputData.txt").toString();
  const dataArr = rawString.split(/\r?\n/).map((lines) => {
    const [command, value] = lines.split(" ");
    return {
      command,
      value: Number(value) || 0,
      cycles: cycleDefinition[command],
    };
  });
  return dataArr;
};

const checkSignalStrength = (currentIndex, value) => {
  if (currentIndex % INSPECT_VALUE === 20) {
    signalMap[currentIndex] = currentIndex * value;
  }
};

const runCycle = (loop, currentIndex, value) => {
  for (let i = 0; i < loop; i++) {
    currentIndex++;
    checkSignalStrength(currentIndex, value);
  }
  return currentIndex;
};

const runCRTCycle = (loop, currentIndex, value) => {
  for (let i = 0; i < loop; i++) {
    drawImage(currentIndex, value);
    currentIndex++;
  }
  return currentIndex;
};

const drawImage = (currentIndex, spritePosition) => {
  const x = currentIndex % COLUMNS;
  const y = Math.floor(currentIndex / COLUMNS);

  const columnInView = Math.abs(x - spritePosition);

  if (columnInView < 2) {
    displayView[y][x] = "#";
  }
  //   console.log(displayView);
};

const getSingalStrength = () => {
  const steps = getData();
  let currentCycle = 0;
  let valX = 1;

  for (const step of steps) {
    const { command, value, cycles } = step;

    switch (command) {
      case "addx":
        currentCycle = runCycle(cycles, currentCycle, valX);
        valX += value;
        break;

      case "noop":
        currentCycle = runCycle(cycles, currentCycle, valX);
        break;

      default:
        throw "Unknown command " + command;
    }
  }
  return Object.values(signalMap).reduce((prev, curr) => prev + curr);
};

const getCRTImage = () => {
  const steps = getData();
  let currentCycle = 0;
  let valX = 1;

  for (const step of steps) {
    const { command, value, cycles } = step;

    switch (command) {
      case "addx":
        currentCycle = runCRTCycle(cycles, currentCycle, valX);
        valX += value;
        break;

      case "noop":
        currentCycle = runCRTCycle(cycles, currentCycle, valX);
        break;

      default:
        throw "Unknown command " + command;
    }
  }
  return displayView.map((row) => row.join(""));
};

// console.log(getData());
console.log(getSingalStrength());
console.log(getCRTImage());
