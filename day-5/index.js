import * as fs from "fs";

//     [D]
// [N] [C]
// [Z] [M] [P]
//  1   2   3

// move 1 from 2 to 1
// move 3 from 1 to 3
// move 2 from 2 to 1
// move 1 from 1 to 2

const getData = () => {
  const rawString = fs.readFileSync("./inputData.txt").toString();
  const dataArr = rawString
    .replace(/\r/g, "")
    .split(/\n\n/)
    .map((x) => x.split("\n"));
  return dataArr;
};

const getParsedData = () => {
  const [rawStacks, rawMoves] = getData();
  const parsedStacks = rawStacks.map((line) =>
    [...line].filter((value, index) => index % 4 === 1)
  );

  const indexes = parsedStacks.pop();

  const stacks = {};

  for (const line of parsedStacks) {
    for (let i = 0; i < line.length; i++) {
      if (line[i] !== " ") {
        if (!stacks[indexes[i]]) {
          stacks[indexes[i]] = [];
        }
        stacks[indexes[i]].unshift(line[i]);
      }
    }
  }

  const parsedMoves = [...rawMoves].map((moves) => moves.match(/\d+/g));
  return { stacks, moves: parsedMoves };
};

const moveStacks = () => {
  const { stacks, moves } = getParsedData();
  for (const move of moves) {
    const [qty, from, to] = move;
    for (let i = 0; i < qty; i++) {
      const moved = stacks[from].pop();
      stacks[to].push(moved);
    }
  }
  return Object.values(stacks)
    .map((crate) => crate[crate.length - 1])
    .join("");
};

const moveStacks9001 = () => {
  const { stacks, moves } = getParsedData();
  for (const move of moves) {
    const [qty, from, to] = move;
    const moved = stacks[from].splice(-qty, qty);
    stacks[to] = [...stacks[to], ...moved];
  }
  return Object.values(stacks)
    .map((crate) => crate[crate.length - 1])
    .join("");
};

//     [D]
// [N] [C]
// [Z] [M] [P]
//  1   2   3

console.log(moveStacks());
console.log(moveStacks9001());
