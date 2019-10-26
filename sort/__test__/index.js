const { isSorted, createArray } = require("../../util");

const chooseSort = require("../chooseSort");
const insertSort = require("../insertSort");
const shellSort = require("../shellSort");
const { mergeSortTop, mergeSortBottom } = require("../mergeSort")
const quickSort = require("../quickSort")

function runTest(fn, testArray) {
  console.time(fn.name);
  fn(testArray);
  console.timeEnd(fn.name);
  console.log(fn.name + ": " + isSorted(testArray));
}

let num = 1000,
  size = 2000;

let arr = createArray(num, size);
runTest(chooseSort, arr);

let arr1 = createArray(num, size);
runTest(insertSort, arr1);

let arr2 = createArray(num, size);
runTest(shellSort, arr2);

let arr3 = createArray(num, size);
runTest(mergeSortTop, arr3);

let arr4 = createArray(num, size);
runTest(mergeSortBottom, arr4);

let arr5 = createArray(num, size);
runTest(quickSort, arr5);
