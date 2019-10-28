class Edge {
  constructor(v, w, weight) {
    this.v = v;
    this.w = w;
    this.weight = weight;
  }
  other(v) {
    return v === this.v ? w : v;
  }
}
