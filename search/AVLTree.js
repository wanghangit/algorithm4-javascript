const { isUnDef, isDef } = require("../util")

class AVLTree{
  constructor(){
    this.root = null
    this.size = 0
  }
  isEmpty(){
    return this.size === 0
  }
  isBalanced(){
    return isBalancedByNode(this.root)
  }
  isBalancedByNode(node){
    if(node == null) return true
    if(Math.abs(this.getBalanceFactor(node))>1){
      return false
    }
    return this.getBalanceFactor(node.left) && this.getBalanceFactor(node.right)
  }
  getBalanceFactor(node){
    if(isUnDef(node)){
      return 0
    }
    return node.left - node.right
  }
  getHeight(node){
    if(isUnDef(node)) return 0
    return node.height
  }
}

class Node{
  constructor(key,val,height){
    this.key = key
    this.value = val
    this.height = height
    this.left = null
    this.right= null
  }
}