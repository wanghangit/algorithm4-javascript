const DfsSearch = require("../dfsSearch")
const BfsSearch = require("../bfsSearch")
const SparseGraph = require("../SparseGraph")
const { readFile } = require("../../util")


const str = readFile("/graph/__test__/test.txt")
const arr = str.split("\n")
let V = Number(arr[0].split(" ")[0]),
    E = Number(arr[0].split(" ")[1]);
function runTest(graph, Search){
  for (let i = 1; i < E; i++) {
    let edge = arr[i].split(" ")
    graph.addEdge(Number(edge[0]), Number(edge[1]))
  }
  graph.show()
  let search = new Search(graph, 0)
  console.log(search.pathTo(4))
}

// 深度遍历
const sparseGraph= new SparseGraph(V);
// runTest(sparseGraph, DfsSearch)

runTest(sparseGraph, BfsSearch)

