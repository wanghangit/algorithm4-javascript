const { swap } = require("../util");

/**
 * 插入排序
 * 也是一种O（n^2）效率的算法
 * 就像插扑克牌一样每次都都把数字插入到合适的顺序
 * 对于近乎有序的数组效率比较高最优能再O（n）的情况下完成
 * 是很多复杂算法在递归过程中，数量较少时的选择的优化处理方法
 * @param {*} array
 */
function insertSort(array) {
  let len = array.length;
  for (let i = 1; i < len; i++) {
    let j = i;
    let target = array[j--]; // 取得要插入的元素
    // 遍历要插入位置前的元素，找到一个比当前元素小的位置，在这之前将元素后移减少了交换，最后直接将缓存的
    for (; j >= 0; j--) {
      if (array[j] > target) {
        array[j + 1] = array[j];
      } else {
        break;
      }
    }
    array[j + 1] = target;
  }
}

module.exports = insertSort;
