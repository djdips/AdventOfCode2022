import * as fs from "fs";

// A Rock
// B Paper
// C Scissors

// X Rock
// Y Paper
// Z Scissors

const moves = {
  rock: "r",
  paper: "p",
  scissors: "s",
};

const mapping = {
  A: moves.rock,
  B: moves.paper,
  C: moves.scissors,
  X: moves.rock,
  Y: moves.paper,
  Z: moves.scissors,
};

const rockScore = 1;
const paperScore = 2;
const scissorsScore = 3;

const win = 6;
const lose = 0;
const draw = 3;

const getScore = (opp, self) => {
  switch (opp) {
    // Rock
    case mapping.A:
      // Draw - Rock
      if (self === mapping.X) {
        return rockScore + draw;
      }
      // Win - Paper
      if (self === mapping.Y) {
        return paperScore + win;
      }
      // Lose - Scissors
      if (self === mapping.Z) {
        return scissorsScore + lose;
      }

    // Paper
    case mapping.B:
      // Rock
      if (self === mapping.X) {
        return rockScore + lose;
      }
      // Paper
      if (self === mapping.Y) {
        return paperScore + draw;
      }
      // Scissors
      if (self === mapping.Z) {
        return scissorsScore + win;
      }

    // Scissors
    case mapping.C:
      // Rock
      if (self === mapping.X) {
        return rockScore + win;
      }
      // Paper
      if (self === mapping.Y) {
        return paperScore + lose;
      }
      // Scissors
      if (self === mapping.Z) {
        return scissorsScore + draw;
      }

    default:
      break;
  }
};

const getScoreSheet = () => {
  const rawString = fs.readFileSync("./inputData.txt").toString();
  const dataArr = rawString.split(/\r?\n/).map((line) => line.split(" "));
  return dataArr;
};

const getResults = () => {
  const scoreSheet = getScoreSheet();

  let finalScore = 0;

  finalScore = scoreSheet
    .map((data) => {
      const opponentMove = mapping[data[0]];
      const selfMove = mapping[data[1]];
      return getScore(opponentMove, selfMove);
    })
    .reduce((prev, curr) => prev + curr);

  return finalScore;
};

const getResultsWithStrategy = () => {
  const scoreSheet = getScoreSheet();

  let finalScore = 0;

  finalScore = scoreSheet
    .map((data) => {
      const opponentMove = mapping[data[0]];
      let selfMove = data[1];

      if (selfMove === "X") {
        if (opponentMove === mapping.A) {
          selfMove = moves.scissors;
        }
        if (opponentMove === mapping.B) {
          selfMove = moves.rock;
        }
        if (opponentMove === mapping.C) {
          selfMove = moves.paper;
        }
      }
      if (selfMove === "Y") {
        selfMove = opponentMove;
      }
      if (selfMove === "Z") {
        if (opponentMove === mapping.A) {
          selfMove = moves.paper;
        }
        if (opponentMove === mapping.B) {
          selfMove = moves.scissors;
        }
        if (opponentMove === mapping.C) {
          selfMove = moves.rock;
        }
      }
      console.log(data[0], opponentMove);
      console.log(data[1], selfMove);
      return getScore(opponentMove, selfMove);
    })
    .reduce((prev, curr) => prev + curr);

  return finalScore;
};

console.log(getResults());
console.log(getResultsWithStrategy());
