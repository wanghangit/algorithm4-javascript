const DfsSearch = require("../dfsSearch")
const SparseGraph = require("../SparseGraph")
const { readFile } = require("../../util")


const str = readFile("/graph/__test__/test.txt")
const arr = str.split("\r\n")
let V = arr[0].split(" ")[0],
    E = arr[0].split(" ")[1]
const sparseGraph= new SparseGraph(V);
for (let i = 1; i < E; i++) {
  let edge = arr[i].split(" ")
  sparseGraph.addEdge(Number(edge[0]), Number(edge[1]))
}
sparseGraph.show()

// 深度遍历
const dfsSearch=new DfsSearch(sparseGraph, 0);
console.log(dfsSearch.pathTo(4))
function runTest(graph){
  for (let i = 1; i < E; i++) {
    let edge = arr[i].split(" ")
    sparseGraph.addEdge(Number(edge[0]), Number(edge[1]))
  }
}