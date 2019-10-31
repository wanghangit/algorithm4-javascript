class LazyPrimMst {
  constructor(graph) {
    this.G = graph;
    this.marked = new Array(graph.V).fill(false);
  }
}