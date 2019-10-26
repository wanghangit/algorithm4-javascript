/**
 * 邻接表的深度优先遍历路径
 */
class DfsSearch{
  constructor(graph,s){
    this.s = s // 图路径遍历的起点
    this.G = graph // 图的引用
    this.count = 0 // 连通分量的数量
    this.marked = new Array(graph.V).fill(false) // 表示顶点是否被访问过
    this.edgeTo = [s] // 从顶点到终点已知顶点的前一个路径
    this.dfs(s)
  }
  dfs(v){
    this.marked[v] = true
    this.count++;
    let adj = this.G.adj[v]
    adj.forEach(w => {
      if(!this.marked[w]){
        this.edgeTo[w] = v
        this.dfs(w)
      }
    });
  }
  /**
   * 是否有一条路径到达这个端点
   * @param {*} v 
   */
  hasPathTo(v){
    return this.marked[v]
  }
  /**
   * 返回到一个顶点的路径
   * @param {*} v 
   */
  pathTo(v){
    if(!this.hasPathTo(v))return null;
    let stack = []
    for (let x=v; x!=this.s; x=this.edgeTo[x]) {
      stack.unshift(x)
    }
    stack.unshift(this.s)
    return stack
  }
}

module.exports = DfsSearch
