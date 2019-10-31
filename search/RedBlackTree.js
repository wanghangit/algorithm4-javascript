const { isUnDef, isDef, validate, swap } = require("../util");
const Tree = require("./Tree")

const RED = true
const BLACK = false

class Node{
  constructor(key,val){
    this.key = key
    this.value = val
    this.left = null
    this.right= null
    this.color = RED
  }
}

/**
 * 红黑树也是一种平衡二叉树
 * 2-3树的变种，是一种黑高绝对平衡的树，
 * 这里实现的是向左倾斜的也就是红色节点只能出现在左子树上，表示红色节点与父节点融合成一个3节点
 * 默认插入的是一个红色节点，这样不会影响黑高，而且和我们2，3树插入都是和叶子节点合并一样
 * 综合效率比较好
 */
class RedBlackTree extends Tree{
  constructor(){
    super()
    this.name="RedBlackTree"
    this.root = null
    this.size = 0
  }
  isRed(node){
    if(node.color === RED){
      return true
    }
    return false
  }
  /**
   * 左旋转当右子树 - 红色节点出现在右边触发
   *            x                   y
   *           / \                 / \
   *          T1  y    ----->     x   z
   *             / \             / \
   *            T2  z           T1 T2
   *
   * @param {*} node
   */
  leftRotate(x){
    let y = x.right
    x.right = y.left
    y.left = x
    y.color = x.color
    x.color = RED
    return y
  }
    /**
   * 右旋转当左子树 - 当向一个红色节点的左子树再插入一个节点时触发
   *         x                   y
   *        / \                 / \
   *       y   T1   ----->     z   x
   *      / \                     / \
   *     z   T2                  T2  T1
   *
   * @param {*} x
   */
  rightRotate(x){
    let y = x.left
    x.left = y.right
    y.right = x
    y.color = x.color
    x.color = RED
    return y
  }
  /**
   * 当两个红节点指向一个黑节点时触发
   * @param {*} node 
   */
  flipColors(node){
    node.color = RED
    node.left.color = BLACK
    node.right.color = BLACK
  }
  /**
   * 添加一个新节点
   * @param {*} key
   * @param {*} value
   */
  add(key, value) {
    this.root = this.addByNode(this.root, key, value);
    this.root.color = BLACK
  }
  /**
   *
   * @param {*} node
   * @param {*} key
   * @param {*} value
   */
  addByNode(node, key, value) {
    if (isUnDef(node)) {
      return new Node(key, value);
    }
    if (key < node.key) {
      node.left = this.addByNode(node.left, key, value);
    } else if (key > node.key) {
      node.right = this.addByNode(node.right, key, value);
    } else {
      node.value = value
    }
    if(!this.isRed(node.left) && this.isRed(node.right)){
      node = this.leftRotate(node)
    }
    if(this.isRed(node.left)&&this.isRed(node.left.left)){
      node = this.rightRotate(node)
    }
    if(this.isRed(node.left)&&this.isRed(node.right)){
      this.flipColors(node)
    }
    return node;
  }

}

module.exports = RedBlackTree