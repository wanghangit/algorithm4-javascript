const { swap } = require("../util")

/**
 * 选择排序
 * 每次选择一个最小的数换到最前边，再剩下的数中再选出最小的数，直到遍历完所有元素
 * 最基础的一种排序算法，效率为O(n^2)
 * 对一些近乎排好序的数组效率也是这样
 * @param {Array} array 
 */
function ChooseSort(array){
  let len = array.length
  for (let i = 0; i < len; i++) {
    let min = i; // 最小元素指针
    let j = i+1 // 指向下一个元素
    for (; j < len; j++) {
      if(array[j]<array[min]){
        min = j
      }
    }
    swap(array, i , min)
  }
}

ChooseSort.name = "ChooseSort"

module.exports=ChooseSort