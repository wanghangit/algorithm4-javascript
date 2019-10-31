const { isUnDef, isDef, validate, swap } = require("../util");
const Tree = require("./Tree");
/**
 * 二叉搜索树
 * 一种基于链表的数据结构
 * 左子树小于根元素,右子树大于根元素
 */
class BST extends Tree {
  constructor() {
    super();
    this.root = null;
    this.name = "BST";
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
   * 更新key节点的值如果没有就创建一个
   * @param {*} key
   * @param {*} value
   */
  add(key, value) {
    this.root = this.addByNode(this.root, key, value);
  }
  /**
   *
   * @param {*} node
   * @param {*} key
   * @param {*} value
   */
  addByNode(node, key, value) {
    if (isUnDef(node)) {
      return new Node(key, value, 1);
    }
    if (key < node.key) {
      node.left = this.addByNode(node.left, key, value);
    } else if (key > node.key) {
      node.right = this.addByNode(node.right, key, value);
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
  delete(key) {
    if (validate(key)) return;
    let node = this.getByNode(this.root, key);
    if (node !== null) {
      this.root = this.deleteByNode(this.root, key);
      return node;
    }
    return null;
  }
  deleteByNode(node, key) {
    if (isUnDef(node)) return null;
    if (key < node.key) {
      node.left = this.deleteByNode(node.left, key);
      return node;
    } else if (key > node.key) {
      node.right = this.deleteByNode(node.right, key);
      return node;
    } else {
      // 在找到要删除的元素时需要处理4种情况
      // 1.左右子树都为空直接删除
      if (isUnDef(node.left) && isUnDef(node.right)) {
        return null;
      }
      // 2.左子树不为空,直接返回左子树
      if (isDef(node.left) && isUnDef(node.right)) {
        return node.left;
      }
      // 3.右子树不为空,直接返回右子树
      if (isDef(node.right) && isUnDef(node.left)) {
        return node.left;
      }
      // 4.左右子树都存在需要在右子树上找到当前节点的后继节点,将后继节点换到当前节点的位置更新后继节点的左右子树
      let minRightNode = this.minByNode(node.right);
      minRightNode.right = this.deleteMinByNode(node.right, minRightNode.key);
      minRightNode.left = node.left;
      node.left = node.right = null;
      return minRightNode;
    }
  }
  /**
   * 删除最小值
   */
  deleteMin() {
    let node = this.min();
    this.root = this.deleteMinByNode(this.root);
    return node;
  }
  deleteMinByNode(node) {
    // 如果左子数为空就删除当前节点也就是直接将父节点引用指向右节点
    if (isUnDef(node.left)) {
      let rightNode = node.right;
      node.right = null;
      return rightNode;
    }
    node.left = this.deleteMinByNode(node.left);
    node.N = this.size(node.left) + this.size(this.right) + 1;
    return node;
  }
}

class Node {
  constructor(key, value, N) {
    this.key = key; // 节点的key用来比较大小
    this.value = value; // 存贮节点的值
    this.N = N; // 当前节点下的节点总数
    this.left = null;
    this.right = null;
  }
}

function runTest() {
  let N = 10;
  let arr = [];
  for (let i = 0; i < N; i++) {
    arr[i] = i;
  }
  // 打乱数组顺序
  for (let i = 0; i < N; i++) {
    const pos = Math.floor(Math.random() * N);
    swap(arr, i, pos);
  }
  console.log(arr);
  arr = [9, 1, 6, 7, 3, 0, 4, 8, 5, 2];
  /**bst功能测试 */
  const bst = new BST();
  for (let i = 0; i < N; i++) {
    bst.add(arr[i], arr[i]);
  }
  // console.log(bst.ceiling(8.2).key)
  // console.log(bst.floor(3.5).key)
  console.log("min:" + bst.min().key);
  console.log("max:" + bst.max().key);
  let res;
  // 测试读取
  for (let i = 0; i < 2 * N; i++) {
    res = bst.get(i);
    if (i >= N) {
      if (isDef(res)) {
        console.log("error");
      }
    }
  }
  console.log("isBST:" + bst.isBST());
  // bst.printTree()
  // 测试删除
  bst.deleteMin();

  bst.delete(3);

  // bst.delete(5)
  bst.delete(5);
  console.log("isBST:" + bst.isBST());
  console.log(bst.get(0), bst.get(3));
  // 测试遍历
  bst.preOrder();
  bst.InOrder();
  bst.postOrder();
  bst.sequenceOrder();
}

// runTest();
module.exports = BST;
