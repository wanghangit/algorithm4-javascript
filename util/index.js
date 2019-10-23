const fs = require("fs");

const cwd = process.cwd();

const readFile = function(fileName){
  const data = fs.readFileSync(cwd+fileName);
  console.log(data);
}

/**
 * 交换数组元素
 * @param {*} arr 
 * @param {*} a 
 * @param {*} b 
 */
const swap = function(arr, a, b){
  let tmp = arr[a]
  arr[a] = arr[b]
  arr[b] =tmp
}

/**
 * 判断数组是否有序
 * @param {*} arr 
 */
const isSorted = function(arr){
  for (let i = 0; i < arr.length-1; i++) {
    if(arr[i+1]<arr[i]){
      return false
    }
  }
  return true
}

/**
 * 生成测试数组
 * @param {*} num 数组元素的个数 
 * @param {*} size 数组元素的最大值
 */
function createArray(num,size){
  if(num<0){
    throw new Error(`num:${num} should large 0`)
    return
  }
  let arr = []
  for (let i = 0; i < num; i++) {
    const e = Math.floor(Math.random()*size)+1
    arr.push(e)
  }
  return arr;
}

module.exports = {
  swap,
  isSorted,
  createArray
}