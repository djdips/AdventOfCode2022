import * as fs from "fs";

const REGEX = /^(.*)\s([\d]:)*$/;
let monkeyBusiness = {};

const getData = () => {
  const rawString = fs.readFileSync("./inputData.txt").toString();
  let index = -1;
  rawString.split(/\r?\n/).forEach((lines) => {
    const items = lines.trim().split(":");
    if (REGEX.test(lines)) {
      index += 1;
      monkeyBusiness[index] = {
        inspectCount: 0,
      };
    }
    if (items[0].includes("Starting items")) {
      monkeyBusiness[index] = {
        ...monkeyBusiness[index],
        initialLevel: items[1].split(",").map(Number),
      };
    }
    if (items[0].includes("Operation")) {
      const opObj = items[1].split(" ").slice(-2);
      monkeyBusiness[index] = {
        ...monkeyBusiness[index],
        inspection: {
          operation: opObj[0],
          value: opObj[1],
        },
      };
    }
    if (items[0].includes("Test")) {
      monkeyBusiness[index] = {
        ...monkeyBusiness[index],
        test: {
          operation: "%",
          value: Number(items[1].split(" ").slice(-1).join("")),
        },
      };
    }
    if (items[0].includes("true")) {
      if (monkeyBusiness[index] && monkeyBusiness[index].test) {
        monkeyBusiness[index].test = {
          ...monkeyBusiness[index].test,
          positive: Number(items[1].split(" ").slice(-1).join("")),
        };
      }
    }
    if (items[0].includes("false")) {
      if (monkeyBusiness[index] && monkeyBusiness[index].test) {
        monkeyBusiness[index].test = {
          ...monkeyBusiness[index].test,
          negative: Number(items[1].split(" ").slice(-1).join("")),
        };
      }
    }
  });
  return monkeyBusiness;
};

const getDivisor = () =>
  Object.values(monkeyBusiness).reduce((acc, curr) => {
    return acc * curr.test.value;
  }, 1);

const inspect = (monkey, index, divisor) => {
  const {
    initialLevel,
    inspection: { operation, value: levelMultiplier },
    test: { value: factor, positive, negative },
  } = monkey;
  // console.log(divisor);
  while (initialLevel.length > 0) {
    // Inspect
    monkeyBusiness[index].inspectCount += 1;
    const level = initialLevel.shift();
    let multiplier =
      levelMultiplier === "old" ? level : Number(levelMultiplier);
    let evalLevel = eval(`${level} ${operation} ${multiplier}`);

    // Monkeys getting bored
    if (divisor) {
      evalLevel = evalLevel % divisor;
    } else {
      evalLevel = Math.floor(evalLevel / 3);
    }

    // Test which monkey gets the items
    if (evalLevel % factor === 0) {
      monkeyBusiness[positive].initialLevel.push(evalLevel);
    } else {
      monkeyBusiness[negative].initialLevel.push(evalLevel);
    }
  }
};

const getActiveMonkeys = (rounds, worried) => {
  let divisor = 0;

  getData();

  if (!worried) {
    divisor = getDivisor();
  }

  for (let i = 0; i < rounds; i++) {
    Object.values(monkeyBusiness).forEach((monkey, index) => {
      inspect(monkey, index, divisor);
    });
    // console.log(monkeyBusiness, "end of round", i);
  }

  const [first, second] = Object.values(monkeyBusiness)
    .map((monkey) => monkey.inspectCount)
    .sort((a, b) => b - a);

  return first * second;
};

// console.log(getData());
console.log(getActiveMonkeys(20, true));
console.log(getActiveMonkeys(10000, false));
