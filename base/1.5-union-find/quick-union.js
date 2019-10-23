const UF = require("./UF")

/**
 * 在union-find中,我们可以看到我们每次合并都要遍历一般数组，这样在面对大量数据时是很低效的
 * 数据结构定义：
 * 定义一个数组id用来存储并查集的元素,这里我们定义值为这个索引指向元素的索引
 * 这样我们就可以像树一样将我们连接的元素都串起来
 */
class QuickUnion extends UF {
  constructor(capacity) {
    super()
    this.id = new Array(capacity);
    this.count = capacity;
    this.name = "quickUnion"
    // 初始化id数组每个都指向自己
    for (let i = 0; i < this.id.length; i++) {
      this.id[i] = i;
    }
  }
  /**
   * 合并两个值的集合
   * 我们只需要找到两个元素的根元素，然后将两个根元素相连
   * @param p
   * @param q
   */
  union(p, q) {
    if(p===q) return
    let pId = this.find(p);
    let qId = this.find(q);
    if(pId===qId) return
    this.id[pId] = qId
    this.count--
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
    return pId === qId;
  }
  /**
   * 寻找连通分量的根元素
   * @param {*} p 
   */
  find(p) {
    if (p < 0 || p >= this.id.length) {
      throw new Error(`p: ${p} is not a regular value`);
    }
    let parent = this.id[p]
    while(parent != this.id[parent]){
      parent = this.id[parent]
    }
    return parent;
  }
}

module.exports = QuickUnion
