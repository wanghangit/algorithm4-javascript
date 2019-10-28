const { isUnDef, isDef, validate, swap } = require("../util")
/**
 * 二叉搜索树
 * 一种基于链表的数据结构
 * 左子树小于根元素,右子树大于根元素
 */
class BST {
  constructor() {
    this.root = null;
  }
  /**
   * 返回节点下的节点总数
   * @param {*} node
   */
  size(node) {
    return isUnDef(node) ? 0 : node.N;
  }
  /**
   * 比较2个节点的大小
   * @param {*} n1
   * @param {*} n2
   */
  less(n1, n2) {
    if (n1.key < n2.key) {
      return true;
    }
    return false;
  }
  /**
   * 根据key获取node节点
   * @param {*} key 
   */
  get(key) {
    if(validate(key)) return
    return this.getByNode(this.root, key);
  }
  getByNode(node, key) {
    if (isUnDef(node)) {
      return null;
    }
    if (key < node.key) {
      return this.getByNode(node.left, key);
    } else if (key > node.key) {
      return this.getByNode(node.right, key);
    }
    return node;
  }
  /**
   * 更新key节点的值如果没有就创建一个
   * @param {*} key
   * @param {*} value
   */
  put(key, value) {
    this.root = this.putByNode(this.root, key, value);
  }
  /**
   *
   * @param {*} node
   * @param {*} key
   * @param {*} value
   */
  putByNode(node, key, value) {
    if (isUnDef(node)) {
      return new Node(key, value, 1);
    }
    if (key < node.key) {
      node.left = this.putByNode(node.left, key, value);
    } else if (key > node.key) {
      node.right = this.putByNode(node.right, key, value);
    } else {
      node.value = value;
    }
    node.N = this.size(node.left) + this.size(node.right) + 1;
    return node;
  }
  /**
   * 根据key删除一个节点
   * @param {*} key 
   */
  delete(key){
    if(validate(key)) return
    this.root = this.deleteByNode(this.root, key)
  }
  deleteByNode(node, key){
    if(isUnDef(node)) return null
    if(key<node.key){
      node.left = this.deleteByNode(node.left, key)
    }else if(key>node.key){
      node.right = this.deleteByNode(node.right, key)
    }else{
      // 在找到要删除的元素时需要处理4种情况
      // 1.左右子树都为空直接删除
      if(isUnDef(node.left)&&isUnDef(node.right)){
        return null
      }
      // 2.左子树不为空,直接返回左子树
      if(isDef(node.left)&&isUnDef(node.right)){
        return node.left
      }
      // 3.右子树不为空,直接返回右子树
      if(isDef(node.right)&&isUnDef(node.left)){
        return node.left
      }
      // 4.左右子树都存在需要在右子树上找到当前节点的后继节点,将后继节点换到当前节点的位置更新后继节点的左右子树
      let minRightNode = this.min(node.right)
      node.right = this.deleteMinByNode(node.right)
      minRightNode.right = node.right
      minRightNode.left = node.left
      return minRightNode
    }
  }
  /**
   * 删除最小值
   */
  deleteMin(){
    this.root = this.deleteMinByNode(this.root)
  }
  deleteMinByNode(node){
    // 如果左子数为空就删除当前节点也就是直接将父节点引用指向右节点
    if(isUnDef(node.left)){
      return node.right
    }
    node.left = this.deleteMinByNode(node.left)
    node.N = this.size(node.left)+this.size(this.right)+1
    return node
  }
  /**
   * 选择最大的元素
   */
  max() {
    return this.maxByNode(this.root);
  }
  maxByNode(node) {
    if (isUnDef(node)) return null;
    while (node.right) {
      node = node.right;
    }
    return node;
  }
  /**
   * 选择最小的元素
   */
  min() {
    return this.minByNode(this.root);
  }
  minByNode(node) {
    if (isUnDef(node)) return null;
    while (node.left) {
      node = node.left;
    }
    return node;
  }
  /**
   * 小于等于key的最大节点
   * 如果key小于当前跟节点那么应该在左子树上
   * 如果key大于当前根节点那么应该去右子树上找，找不到就是根节点
   * 如果等于就直接返回
   */
  floor(key) {
    validate(key)
    return this.floorByNode(this.root, key)
  }
  floorByNode(node, key){
    if(isUnDef(node)) return null
    if(key<node.key){
      return this.floorByNode(node.left, key)
    }else if(key === node.key){
      return node
    }else{
      let right = this.floorByNode(node.right, key)
      if(isDef(right)){
        return right
      }else{
        return node
      }
    }
  }
  /**
   * 大于等于key的最大节点
   * 逻辑与floor相似
   */
  ceiling(key) {
    return this.ceilingByNode(this.root, key)
  }
  ceilingByNode(node, key){
    if(isUnDef(node)) return null
    if(key>node.key){
      return this.ceilingByNode(node.right, key)
    }else if(key === node.key){
      return node
    }else{
      let left = this.ceilingByNode(node.left, key)
      if(isDef(left)){
        return left
      }
      return node
    }
  }
  /**
   * 选择排名为k的节点
   * k小于根的左子树数量就去左子树上找
   * k大于根的左子树数量就要去右子树上递归去找，排名要减去左子树和根元素数量
   */
  select(k) {
    if(k>this.root.N){
      return null
    }
    return this.selectByNode(this.root, k)
  }
  selectByNode(node, k){
    let t = node.left.N
    if(t<k){
      return this.selectByNode(node.left, k)
    }else if(t === k){
      return node
    }else{
      return this.selectByNode(node.right, k-t-1)
    }
  }
  /**
   * 前序遍历
   * 用数组模拟栈来遍历
   */
  preOrder(bst){
    const stack = []
    stack.push(bst.root)
    let node,
        str = '';
    while(stack.length>0){
      node = stack.pop()
      if(node.key){
        str+=node.key+'->'
      }
      if(isDef(node.right)){
        stack.push(node.right)
      }
      if(isDef(node.left)){
        stack.push(node.left)
      }
    }
    console.log(str)
  }
  /**
   * 中序遍历
   */
  InOrder(){

  }
  /**
   * 后序遍历
   */
  postOrder(){

  }
  /**
   * 层序遍历
   */
  sequenceOrder(){

  }
}

class Node {
  constructor(key, value, N) {
    this.key = key; // 节点的key用来比较大小
    this.value = value; // 存贮节点的值
    this.N = N; // 当前节点下的节点总数
  }
}

function runTest(){
  let N = 1000
  let arr = []
  for (let i = 0; i < N; i++) {
    arr[i] = i 
  }
  // 打乱数组顺序
  for (let i = 0; i < N; i++) {
    const pos = Math.floor(Math.random()*N)
    swap(arr, i, pos)
  }
  /**bst功能测试 */
  const bst = new BST();

  for (let i = 0; i < N; i++) {
    bst.put(arr[i], arr[i])
  }
  console.log(arr)
  console.log(bst.ceiling(8.2).key)
  console.log(bst.floor(3.5).key)
  console.log("min:"+bst.min().key)
  console.log("max:"+bst.max().key)
  let res
  for (let i = 0; i < 2*N; i++) {
    res = bst.get(i)
    if(i>=N){
      if(isDef(res)){
        console.log('error')
      }
    }
  }
  // bst.deleteMin()
  // bst.delete(3)
  console.log(bst.get(0),bst.get(3))
  console.log(bst)
  bst.preOrder(bst)
}

runTest()
module.exports = {
  BST,
  Node
}
