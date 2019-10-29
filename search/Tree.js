const { isDef, isUnDef, validate } = require("../util");

class Tree{
  constructor(){

  }
  isBST(){
    
  }
  /**
   * 根据key获取node节点
   * @param {*} key
   */
  get(key) {
    if (validate(key)) return;
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
    validate(key);
    return this.floorByNode(this.root, key);
  }
  floorByNode(node, key) {
    if (isUnDef(node)) return null;
    if (key < node.key) {
      return this.floorByNode(node.left, key);
    } else if (key === node.key) {
      return node;
    } else {
      let right = this.floorByNode(node.right, key);
      if (isDef(right)) {
        return right;
      } else {
        return node;
      }
    }
  }
  /**
   * 大于等于key的最大节点
   * 逻辑与floor相似
   */
  ceiling(key) {
    return this.ceilingByNode(this.root, key);
  }
  ceilingByNode(node, key) {
    if (isUnDef(node)) return null;
    if (key > node.key) {
      return this.ceilingByNode(node.right, key);
    } else if (key === node.key) {
      return node;
    } else {
      let left = this.ceilingByNode(node.left, key);
      if (isDef(left)) {
        return left;
      }
      return node;
    }
  }
  /**
   * 选择排名为k的节点
   * k小于根的左子树数量就去左子树上找
   * k大于根的左子树数量就要去右子树上递归去找，排名要减去左子树和根元素数量
   */
  select(k) {
    if (k > this.root.N) {
      return null;
    }
    return this.selectByNode(this.root, k);
  }
  selectByNode(node, k) {
    let t = node.left.N;
    if (t < k) {
      return this.selectByNode(node.left, k);
    } else if (t === k) {
      return node;
    } else {
      return this.selectByNode(node.right, k - t - 1);
    }
  }
  /**
   * 前序遍历
   * 用数组模拟栈来遍历
   */
  preOrder(bst) {
    const stack = [];
    stack.push(this.root);
    let node,
      str = "";
    while (stack.length > 0) {
      node = stack.pop();
      if (node.key || node.key === 0) {
        str += node.key + "->";
      }
      if (isDef(node.right)) {
        stack.push(node.right);
      }
      if (isDef(node.left)) {
        stack.push(node.left);
      }
    }
    console.log(str);
  }
  /**
   * 中序遍历
   */
  InOrder() {
    const stack = [];
    let node = this.root;
    let str = "";
    while (stack.length > 0 || isDef(node)) {
      // 首先遍历找到最左的节点
      while (isDef(node)) {
        stack.push(node);
        node = node.left;
      }
      if (stack.length > 0) {
        node = stack.pop();
        str += node.key + "->";
        // 如果最左边节点有右子树再将这个右子树的左节点推入栈
        node = node.right;
      }
    }
    console.log(str);
  }
  /**
   * 后序遍历
   * 用两个栈实现
   */
  postOrder() {
    const stack1 = [];
    const stack2 = [];
    stack1.push(this.root);
    let node,
      str = "";
    while (stack1.length > 0) {
      node = stack1.pop();
      stack2.push(node);
      if (isDef(node.left)) {
        stack1.push(node.left);
      }
      if (isDef(node.right)) {
        stack1.push(node.right);
      }
    }
    while (stack2.length > 0) {
      str += stack2.pop().key + "->";
    }
    console.log(str);
  }
  /**
   * 层序遍历
   */
  sequenceOrder() {
    const queue = [];
    queue.push(this.root);
    let node,
      str = "";
    while (queue.length > 0) {
      node = queue.shift();
      str += node.key + "->";
      if (isDef(node.left)) {
        queue.push(node.left);
      }
      if (isDef(node.right)) {
        queue.push(node.right);
      }
    }
    console.log(str);
  }
}

module.exports = Tree