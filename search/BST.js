class BST{
  constructor(node){
    this.root = node
  }
  /**
   * 返回节点下的节点总数
   * @param {*} node 
   */
  size(node){
    return node === null ? 0: node.N
  }
  /**
   * 比较2个节点的大小
   * @param {*} n1 
   * @param {*} n2 
   */
  less(n1,n2){
    if(n1.key<n2.key){
      return true
    }
    return false
  }
  get(key){
    return this.getByNode(this.root, key)
  }
  getByNode(node, key){
    if(node === null){
      return null
    }
    if(key<node.key){
      return this.getByNode(node.left, key)
    }else if(key>node.key){
      return this.getByNode(node.right, key)
    }
    return node
  }
  /**
   * 更新key节点的值如果没有就创建一个
   * @param {*} key 
   * @param {*} value 
   */
  put(key,value){
    this.root = this.put(this.root,key,value)
  }
  /**
   * 
   * @param {*} node 
   * @param {*} key 
   * @param {*} value 
   */
  putByNode(node,key,value){
    if(node === null){
      return new Node(key,value,1)
    }
    if(key<node.key){
      node.left = this.putByNode(node.left,key,value)
    }else if(key>node.key){
      node.right = this.putByNode(node.right, key, value)
    }else{
      node.value = value
    }
    node.N = this.size(node.left)+this.size(node.right)+1
    return node
  }
  max(){

  }
  min(){

  }
  floor(){

  }
  ceiling(){

  }
  select(){

  }
  rank(){
    
  }
}

class Node{
  constructor(key, value, N){
    this.key = key // 节点的key用来比较大小
    this.value = value // 存贮节点的值
    this.N = N // 当前节点下的节点总数
  }
}