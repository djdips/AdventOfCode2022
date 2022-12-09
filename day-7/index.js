import * as fs from "fs";

const ROOT = "/";
const CD = "cd";
const DIR = "dir";
const LS = "ls";
const BASH_COMMAND = "$";
const BACK = "..";

let tree = {};
let pwd = [];
let dirs = {};

const getData = () => {
  const rawString = fs.readFileSync("./inputData.txt").toString();
  const dataArr = rawString.split(/\r?\n/);
  return dataArr;
};

const addItems = (command) => {
  const currDir = pwd.reduce((prev, curr) => prev[curr], tree);
  const fileName = /^([\d]*)$/;

  if (fileName.test(command[0])) {
    currDir[command[1]] = command[0];
  } else {
    currDir[command[1]] = {};
  }
  return currDir;
};

const changeDirectory = (dir) => {
  if (dir === ROOT) {
    pwd = [];
  } else if (dir === BACK) {
    pwd.pop();
  } else {
    pwd.push(dir);
  }
};

const calculateSize = (dir = "", treeOb = tree) => {
  let size = 0;
  for (let [key, val] of Object.entries(treeOb)) {
    const value = parseInt(val);
    if (!isNaN(value)) {
      size += parseInt(value);
    } else {
      size += calculateSize(`${dir}_${key}`, val);
    }
  }

  dirs[dir ? dir : "/"] = size;
  return size;
};

const getFileSize = () => {
  const treeList = getData();

  for (const line of treeList) {
    const command = line.split(" ");
    const isBashCommand = command[0] === BASH_COMMAND;
    if (isBashCommand && command.includes(CD)) {
      changeDirectory(command[command.length - 1]);
    } else if (!isBashCommand) {
      addItems(command);
    }
  }
  calculateSize();

  return Object.values(dirs)
    .sort((a, b) => a[1] - b[1])
    .filter((size) => size <= 100000)
    .reduce((prev, curr) => prev + curr, 0);
};

const getSmallestSizeToDelete = () => {
  const required = 30000000;
  const total = 70000000;
  const available = required - (total - dirs[ROOT]);

  const candidate = Object.values(dirs)
    .sort((a, b) => a[1] - b[1])
    .filter((size) => size >= available);

  return Math.min(...candidate);
};

console.log(getData());
console.log(getFileSize());
console.log(getSmallestSizeToDelete());
