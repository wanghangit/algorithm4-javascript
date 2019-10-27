const { swap } = require("../util")

/**
 * 最小索引堆
 * 在最小堆的基础上引出的一种数据结构
 * 用三个平行数组来存储这种结构
 * keys表示的是下标为索引key，值为索引的值，只保存对应关系
 * pq下标表示的是最小堆中的顺序，值为索引key，用来实现最小堆的数组
 * qp下标表示的是索引key，值为对应的在pq中的下标，主要用来加快修改的效率
 * 为了方便引用最小堆中的元素
 */
class IndexMinPQ{
  constructor(capacity){
    this.keys = new Array(capacity+1) // 存放索引对应的值
    this.pq = new Array(capacity+1) // 实现最小堆的数组，值为keys的索引
    this.qp = new Array(capacity+1).fill(-1) // 存放索引对应的在pq中的位置
    this.count = 0
    this.capacity = capacity
  }
  isEmpty(){
    return this.count === 0
  }
  get(key){
    return this.keys[key+1]
  }
  /**
   * 为方便计算将索引加一对于用户来说还是从0开始的索引
   * 将索引对应的值加入堆
   * @param {*} key 
   * @param {*} value 
   */
  insert(key, value){
    key = key+1
    this.keys[key] = value
    this.pq[++this.count] = key
    this.qp[key] = this.count
    this.swim(this.count)
  }
  /**
   * 修改索引对应的值
   * @param {*} key 
   * @param {*} newValue 
   */
  change(key, newValue){
    key+=1
    this.keys[key] = newValue
    // 如果新的值小，上浮保持最小堆性质
    this.swim(this.qp[key])
    // 如果新的值大，下沉保持最小堆性质
    this.sink(this.qp[key])
  }
  /**
   * 删除最小值
   */
  deleteMin(){
    let minValue = this.keys[this.pq[1]]
    swap(this.pq, 1, this.count)
    this.qp[this.count] = -1
    this.keys[this.count] = null
    this.count--;
    this.sink(1)
    return minValue
  }
  /**
   * 上浮操作
   * @param {*} k 
   */
  swim(k){
    while(k/2>=1 && this.less(this.pq[k],this.pq[Math.floor(k/2)])){
      swap(this.pq, k, Math.floor(k/2))
      k = Math.floor(k/2)
    }
  }
  /**
   * 下沉操作
   * @param {} k 
   */
  sink(k){
    while(2*k<=this.count){
      let j = 2*k
      if(j+1<=this.count && this.less(this.pq[j+1],this.pq[j])){
        j++;
      }
      if(this.less(this.pq[k], this.pq[j])){
        break
      }
      swap(this.pq, k, j)
      k=j;
    }
  }
  less(k1,k2){
    if(this.keys[k1]<this.keys[k2]){
      return true
    }
    return false
  }
  contains(key){
    return qp[key+1] !== -1
  }
}

module.exports = IndexMinPQ