const { isUnDef, isDef, swap } = require("../util");
const Tree = require("./Tree");

class Node {
  constructor(key, val) {
    this.key = key;
    this.value = val;
    this.height = 1;
    this.left = null;
    this.right = null;
  }
}

class AVLTree extends Tree {
  constructor() {
    super();
    this.name = "AVLTree";
    this.root = null;
    this.size = 0;
  }
  isEmpty() {
    return this.size === 0;
  }
  isBalanced() {
    return this.isBalancedByNode(this.root);
  }
  isBalancedByNode(node) {
    if (node == null) return true;
    if (Math.abs(this.getBalanceFactor(node)) > 1) {
      return false;
    }
    return (
      this.isBalancedByNode(node.left) && this.isBalancedByNode(node.right)
    );
  }
  getBalanceFactor(node) {
    if (isUnDef(node)) {
      return 0;
    }
    return this.getHeight(node.left) - this.getHeight(node.right);
  }
  getHeight(node) {
    if (isUnDef(node)) return 0;
    return node.height;
  }
  add(key, value) {
    this.root = this.addByNode(this.root, key, value);
  }
  addByNode(node, key, value) {
    if (isUnDef(node)) {
      this.size++;
      return new Node(key, value);
    }
    if (key < node.key) {
      node.left = this.addByNode(node.left, key, value);
    } else if (key > node.key) {
      node.right = this.addByNode(node.right, key, value);
    } else {
      node.value = value;
    }
    // 维护节点的高度
    node.height =
      1 + Math.max(this.getHeight(node.left), this.getHeight(node.right));
    // 获取平衡因子
    let balacnce = this.getBalanceFactor(node);
    // LL右旋转的基本形式多出的两个节点在x的左边
    if (balacnce > 1 && this.getBalanceFactor(node.left) >= 0) {
      return this.rightRotate(node);
    }
    // RR左旋转的基本形式多出的两个节点在x的右边
    if (balacnce < -1 && this.getBalanceFactor(node.right) <= 0) {
      return this.leftRotate(node);
    }
    /**
     * LR 形如下边这种多出的两个节点一个在左边，一个在左子树的右边需要进行两次旋转
     *
     *         x                   x                  z
     *        / \                 / \                / \
     *       y   T1   ----->     z   T1  ---->     y     x
     *      / \                 / \               / \   / \
     *     T2  z               y  T4             T2 T3    T4 T1
     *        / \             / \
     *       T3  T4          T2  T3
     */

    if (balacnce > 1 && this.getBalanceFactor(node.left) < 0) {
      node.left = this.leftRotate(node.left);
      return this.rightRotate(node);
    }
    // RL 和LR类似只不过反过来也需要两次旋转
    if (balacnce < -1 && this.getBalanceFactor(node.right) > 0) {
      node.right = this.rightRotate(node.right);
      return this.leftRotate(node);
    }
    return node;
  }
  /**
   * 左旋转当右子树 - 左子树的高度差大于1时触发
   *            x                   y
   *           / \                 / \
   *          T1  y    ----->     x   z
   *             / \             / \
   *            T2  z           T1 T2
   *
   * @param {*} node
   */
  leftRotate(x) {
    let y = x.right;
    let T2 = y.left;
    x.right = T2;
    y.left = x;
    x.height = 1 + Math.max(this.getHeight(x.left), this.getHeight(x.right));
    y.height = 1 + Math.max(this.getHeight(y.left), this.getHeight(y.right));
    return y;
  }

  /**
   * 右旋转当左子树 - 右子树的高度大于1时触发
   *         x                   y
   *        / \                 / \
   *       y   T1   ----->     z   x
   *      / \                     / \
   *     z   T2                  T2  T1
   *
   * @param {*} x
   */
  rightRotate(x) {
    let y = x.left;
    let T2 = y.right;
    y.right = x;
    x.left = T2;
    x.height = 1 + Math.max(this.getHeight(x.left), this.getHeight(x.right));
    y.height = 1 + Math.max(this.getHeight(y.left), this.getHeight(y.right));
    return y;
  }
  delete(key) {
    let node = this.getByNode(this.root, key);
    if (isDef(node)) {
      this.root = this.deleteByNode(this.root, key);
      return node;
    }
    return null;
  }
  deleteByNode(node, key) {
    if (isUnDef(node)) return null;
    let reNode;
    if (key < node.key) {
      node.left = this.deleteByNode(node.left, key);
      reNode = node;
    } else if (key > node.key) {
      node.right = this.deleteByNode(node.right, key);
      reNode = node;
    } else {
      // 待删除节点左子树为空
      if (isUnDef(node.left)) {
        let rightNode = node.right;
        node.right = null; // 与右节点脱离关系
        this.size--;
        return rightNode;
      }
      if (isUnDef(node.right)) {
        let leftNode = node.left;
        node.left = null;
        this.size--;
        return leftNode;
      }
      // 和二分搜索树一样选出当前节点的后继元素
      let rightMinNode = this.minByNode(node.right);
      // 将删除的元素的右子树指向删除后继元素后的树
      rightMinNode.right = this.deleteByNode(node.right, rightMinNode.key);
      rightMinNode.left = node.left;
      node.left = node.right = null; // 清除游离元素
      reNode = rightMinNode;
    }
    if (isUnDef(reNode)) {
      return null;
    }
    // 维护高度
    reNode.height =
      1 + Math.max(this.getHeight(reNode.left), this.getHeight(reNode.right));
    let balacnce = this.getBalanceFactor(reNode);
    // LL右旋转的基本形式多出的两个节点在x的左边
    if (balacnce > 1 && this.getBalanceFactor(reNode.left) >= 0) {
      return this.rightRotate(reNode);
    }
    // RR左旋转的基本形式多出的两个节点在x的右边
    if (balacnce < -1 && this.getBalanceFactor(reNode.right) <= 0) {
      return this.leftRotate(reNode);
    }
    /**
     * LR 形如下边这种多出的两个节点一个在左边，一个在左子树的右边需要进行两次旋转
     *
     *         x                   x                  z
     *        / \                 / \                / \
     *       y   T1   ----->     z   T1  ---->     y     x
     *      / \                 / \               / \   / \
     *     T2  z               y  T4             T2 T3    T4 T1
     *        / \             / \
     *       T3  T4          T2  T3
     */

    if (balacnce > 1 && this.getBalanceFactor(reNode.left) < 0) {
      reNode.left = this.leftRotate(reNode.left);
      return this.rightRotate(reNode);
    }
    // RL 和LR类似只不过反过来也需要两次旋转
    if (balacnce < -1 && this.getBalanceFactor(reNode.right) > 0) {
      reNode.right = this.rightRotate(reNode.right);
      return this.leftRotate(reNode);
    }
    return reNode;
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
  arr = [2, 0, 1, 8, 3, 9, 4, 6, 5, 7];
  const avlTree = new AVLTree();
  for (let i = 0; i < N; i++) {
    avlTree.add(arr[i], arr[i]);
  }
  console.log(avlTree.isBalanced());
  // 测试删除
  avlTree.delete(3);
  avlTree.delete(5);
  console.log(avlTree.isBalanced());
  console.log(avlTree.get(0), avlTree.get(3));
  // 4种遍历
  avlTree.preOrder();
  avlTree.InOrder();
  avlTree.postOrder();
  avlTree.sequenceOrder();
}

// runTest()

module.exports = AVLTree;
