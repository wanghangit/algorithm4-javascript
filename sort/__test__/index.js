const { isSorted, createArray } = require("../../util")

const chooseSort = require("../chooseSort")
const insertSort = require("../insertSort")
const shellSort = require("../shellSort")

function runTest(fn, testArray){
  console.time(fn.name)
  fn(testArray)
  console.timeEnd(fn.name)
  console.log(fn.name+": "+isSorted(testArray))
}

let num =10000,
    size = 10000;

let arr = createArray(num, size);
runTest(chooseSort, arr)


let arr1 = createArray(num, size);
runTest(insertSort,arr1)

let arr2 = createArray(num, size);
runTest(shellSort,arr2)
