const insertSort = require("./insertSort");

/**
 * 归并排序
 * 一种分治的思想来解决排序的问题
 * 构想是假如我们把一个数组分成2个已经排好序的数组来看待，我只需要遍历一遍这两个数组就可以将数组排好序
 * 对于这个2个子数组，我们也可以用同样的方法去处理直到数组只有一个元素，我们直接合并2个只有一个元素的数组
 * 这样从上到下我们把排序问题变成了如何合并2个数组的问题
 * @param {*} array
 */
function mergeSortTop(array) {
  merge(array, 0, array.length - 1);
}

/**
 * 归并算法的另一种实现，只是归并的顺序不同
 * 这是一种从底部开始往上的过程，我会先2，2元素的进行归并，然后4，4直到达到数组的一般时
 * 这样也分解成为了2个有序数组的归并
 * @param {*} array
 */
function mergeSortBottom(array) {
  let len = array.length;
  for (let sz = 1; sz < len; sz += sz) {
    for (let i = 0; i < len - sz; i += 2 * sz) {
      merge(array, i, Math.min(i + 2 * sz, len - 1));
    }
  }
}

/**
 * [l-r] 表示在这个左右都是闭的区间内排序
 * @param {*} array
 * @param {*} l
 * @param {*} r
 */
function merge(array, l, r) {
  if (l >= r) return;
  let mid = Math.floor(l + (r - l) / 2);
  merge(array, l, mid);
  merge(array, mid + 1, r);
  let auk = [];
  for (let i = 0; i < array.length; i++) {
    auk[i] = array[i];
  }
  let j = mid + 1;
  let i = l;
  while (l <= mid || j <= r) {
    if (l > mid) {
      array[i++] = auk[j++];
    } else if (j > r) {
      array[i++] = auk[l++];
    } else if (auk[l] <= auk[j]) {
      array[i++] = auk[l++];
    } else if (auk[l] > auk[j]) {
      array[i++] = auk[j++];
    }
  }
}

module.exports = {
  mergeSortTop,
  mergeSortBottom
};
