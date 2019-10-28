/**
 * 稀疏图邻接表的表示方法
 * 用一个二维数组来存贮所有数据
 * 一维数组的索引表示的是顶点，二维数组表示的是与这个顶点相连的另一个顶点的值
 */
class SparseGraph {
  constructor(v) {
    let tmpArray = [];
    for (let i = 0; i < v; i++) {
      tmpArray[i] = [];
    }
    this.V = v; // 表示图中的顶点数
    this.E = 0; // 表示图的边数
    this.adj = tmpArray; // 存储邻接表中数据的二维数组
  }
  /**
   * 添加一条边
   * @param {*} v
   * @param {*} w
   */
  addEdge(v, w) {
    if (this.assertV(v) && this.assertV(w)) {
      console.log("v is not validated");
      return;
    }
    if (v != w) {
      this.adj[v].push(w);
      this.adj[w].push(v);
      this.E++;
    }
  }
  assertV(v) {
    if (v < 0 || v >= this.V) {
      return true;
    }
    return false;
  }
  show() {
    let str = "";
    let edges;
    for (let i = 0; i < this.V; i++) {
      edges = this.adj[i];
      str += `${i}: `;
      for (let j = 0; j < edges.length; j++) {
        str += edges[j];
      }
      str += "\t\n";
    }
    console.log(str);
  }
}

module.exports = SparseGraph;
