const { swap } = require("../util");

/**
 * 基于数组实现的最大堆优先队列
 */
class maxPQ {
  constructor(array) {
    if (array) {
      this.size = array.length;
      this.keys = [].concat(array);
      for (let i = Math.floor((this.size - 2) / 2); i >= 0; i--) {
        this.sink(i);
      }
    } else {
      this.keys = [];
      this.size = 0;
    }
  }
  size() {
    return this.size;
  }
  isEmpty() {
    return this.size === 0;
  }
  insert(v) {
    this.keys[this.size++] = v;
    this.swim(v);
  }
  deleteMax() {
    swap(this.keys, 0, this.size - 1);
    let max = this.keys.pop();
    this.sink(0);
    this.size--;
    return max;
  }
  less(k1, k2) {
    if (this.keys[k1] < this.keys[k2]) {
      return true;
    }
    return false;
  }
  /**
   * 下沉操作一般用于删除操作
   * 子元素2K+1,2K+2中选出大的和k比较如果子元素大就交换元素也就是下沉操作
   */
  sink(k) {
    let max;
    while (2 * k + 1 < this.size) {
      if (this.less(2 * k + 2, 2 * k + 1)) {
        max = 2 * k + 1;
      } else {
        max = 2 * k + 2;
      }
      if (this.less(k, max)) {
        swap(this.keys, max, k);
        k = max;
      } else {
        break;
      }
    }
  }
  /**
   * 上浮用于插入操作
   * @param {*} index
   */
  swim(k) {
    let p;
    while (k >= 0) {
      p = Math.floor((k - 1) / 2);
      if (this.less(p, k)) {
        swap(keys, p, k);
        k = p;
      } else {
        break;
      }
    }
  }
}

module.exports = maxPQ;
