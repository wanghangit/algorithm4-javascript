const UF = require("./UF")

/**
 * 
 * 最简单实现的并查集
 * 数据结构定义：
 * 我们用一个数组id来存储所有并查集中的元素
 * 如果两个元素相连，我们就将2个元素的值改为相同的值
 */
class quickFind extends UF{
  constructor(capacity) {
    super()
    this.name = 'unionFind'
    this.id = new Array(capacity);
    // 初始化连通分量
    this.count = capacity;
    // 将所有的数组的值等于索引，表明现在所有元素都不相连
    for (let i = 0; i < capacity; i++) {
      this.id[i] = i;
    }
  }
  /**
   * 合并两个值的集合
   * 合并需要遍历一遍数组所以需要O(n)的复杂度
   * @param p 
   * @param q 
   */
  union(p, q) {
    let pId = this.find(p);
    let qId = this.find(q);
    if (pId === qId) return;
    for (let i = 0; i < this.id.length; i++) {
      if(this.id[i] === qId){
        this.id[i] = pId
      }
    }
    this.count--;
  }
  /**
   * 判断是否相连我们直接判断值就可以
   * O(1)的复杂度
   * @param p 
   * @param q 
   */
  connected(p, q) {
    let pId = this.find(p);
    let qId = this.find(q);
    return pId !== qId;
  }
  find(p) {
    if (p < 0 || p >= this.id.length) {
      throw new Error(`p: ${p} is not a regular value`);
    }
    return this.id[p];
  }
}

module.exports = quickFind