const UF = require("./UF")

/**
 * 加权的并查集
 * 在quick-union中我们可以看到在合并元素的时候我们合并的效率决定于树的高度
 * 由于在合并两个连通分量的时候是随机合并的，可能会造成树向一边倾斜，我们这里多引入一个数组size来记录每个元素下边的元素数量
 * 这样我们在合并时总可以保证，小树往大树上合并保证效率在O（lgN）的效率下完成一次
 * 对于这个权重我们也可以来比较树的高度，这里就比演示了
 */
class WeightQuickUnion extends UF{
  constructor(capacity){
    super()
    this.id = new Array(capacity);
    this.size = new Array(capacity);
    this.count = capacity
    this.name = "weightQuickUnion"
    for (let i = 0; i < capacity; i++) {
      this.id[i] = i;
      this.size[i] = 1;
    }
  }
  /**
   * 合并两个值的集合
   * 我们只需要找到两个元素的根元素，比较元素个数，将数量少的树合并到多的上
   * 并且维护一下根元素的数量
   * @param p
   * @param q
   */
  union(p, q) {
    if(p===q) return
    let pId = this.find(p);
    let qId = this.find(q);
    // 如果根元素相同则说明已经连接在一起了
    if(pId===qId) return
    if(this.size[pId]>=this.size[qId]){
      this.id[qId] = pId
      this.size[qId]+=this.size[pId]
    }else{
      this.id[pId] = qId
      this.size[pId]+=this.size[qId]
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

module.exports = WeightQuickUnion