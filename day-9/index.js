import * as fs from "fs";

const movesDict = {
  R: "RIGHT",
  L: "LEFT",
  U: "UP",
  D: "DOWN",
};

const getData = () => {
  const rawString = fs.readFileSync("./inputData.txt").toString();
  const dataArr = rawString.split(/\r?\n/).map((lines) => {
    const [direction, totalSteps] = lines.split(" ");
    return {
      direction: movesDict[direction],
      totalSteps: Number(totalSteps),
    };
  });
  return dataArr;
};

const shukaku = [
  { y: 0, x: 0 },
  { y: 0, x: 0 },
];

const kurama = Array.from({ length: 10 })
  .fill()
  .map(() => ({ y: 0, x: 0 }));

const moveSteps = {
  [movesDict["R"]]: {
    x: 1,
    y: 0,
  },
  [movesDict["L"]]: {
    x: -1,
    y: 0,
  },
  [movesDict["U"]]: {
    x: 0,
    y: -1,
  },
  [movesDict["D"]]: {
    x: 0,
    y: 1,
  },
};

const moveTail = (distance, head, tail) => {
  const { x: distanceX, y: distanceY } = distance;
  const onSameRow = head.y === tail.y;
  const onSameColumn = head.x === tail.x;
  const onSameTangent = onSameRow || onSameColumn;

  const isRowFar = Math.abs(distanceY) > 1;
  const isColFar = Math.abs(distanceX) > 1;
  const hasDistance = isRowFar || isColFar;

  if (onSameTangent && hasDistance) {
    const stepX = distanceX > 0 ? 1 : -1;
    const stepY = distanceY > 0 ? 1 : -1;
    if (onSameRow) {
      tail.x += stepX;
    }
    if (onSameColumn) {
      tail.y += stepY;
    }
  } else if (hasDistance) {
    const stepX = head.x > tail.x ? 1 : -1;
    const stepY = head.y > tail.y ? 1 : -1;
    tail.y += stepY;
    tail.x += stepX;
  }
};

const getVisitedOnce = (beast) => {
  const moves = getData();

  let visible = new Set();
  visible.add(`0-0`);

  for (const move of moves) {
    const { direction, totalSteps } = move;
    const moved = moveSteps[direction];
    let head = beast[0];
    let tail = beast[1];

    for (let x = 0; x < totalSteps; x++) {
      head = beast[0];
      head.x += moved.x;
      head.y += moved.y;

      for (let i = 1; i < beast.length; i++) {
        head = beast[i - 1];
        tail = beast[i];
        const distance = { x: head.x - tail.x, y: head.y - tail.y };
        moveTail(distance, head, tail);
      }
      visible.add(`${tail.y}-${tail.x}`);
    }
  }
  //   console.log(visible, "visible");
  return visible.size;
};

// console.log(getData());
console.log(getVisitedOnce(shukaku));
console.log(getVisitedOnce(kurama));
