/**
 * 插入排序算法的一种高级实现
 * 思想是我们在插入的时候一次只能挪动一个位置，在大的数组中我们要挪到正确的位置是比较慢的
 * 如果我们可以一次挪动多个位置这样可以加快排序的效率，这就是希尔排序的中心思想
 * @param {*} array
 */
function shellSort(array) {
  let len = array.length;
  let h = 1;
  while (h < len / 3) {
    h = 3 * h + 1;
  }

  while (h >= 1) {
    for (let i = 0; i < len; i++) {
      let j = i + h;
      let target = array[j];
      j -= h;
      for (; j >= 0; j -= h) {
        if (array[j] > target) {
          array[j + h] = array[j];
        } else {
          break;
        }
      }
      array[j + h] = target;
    }
    h = Math.floor(h / 3);
  }
}

module.exports = shellSort;
