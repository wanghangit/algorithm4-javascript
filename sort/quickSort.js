const { swap } = require("../util");

/**
 * 快速排序
 * 最常用的一种算法平均情况下效率在O(lgN)
 * @param {*} array 
 */
function quickSort(array){
  sort(array, 0, array.length-1)
}

function sort(array, l, r){
  if(l>=r) return
  let k = partten(array, l, r)
  sort(array,l, k-1)
  sort(array, k+1, r)
}
// function partten(arr, l, r){
//   let k = l;
//   let j = l+1
//   for (let i = j; i <= r; i++) {
//     if(arr[i]<arr[k]){
//       swap(arr, j++, i)
//     }
//   }
//   swap(arr, k, --j)
//   return j
// }
function partten(array, l, r){
  if(l>=r) return 
  let k = l;
  let start = l,
      end = r+1;
  while(true){
    while(array[++start]<=array[k]){
      if(start==r) break
    } 
    while(array[--end]>=array[k]){
      if(end == l) break
    }
    if(start>=end) break
    swap(array, start, end)
  }
  swap(array, k, start)
  return start
}
[10,3,11,2,22]

module.exports = quickSort