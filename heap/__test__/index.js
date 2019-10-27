const maxPQ = require("../maxPQ")
const IndexMinPQ = require("../indexMinPQ")

const arr  = [4,10,22,3,1,8]
const pq = new maxPQ(arr)
const len = arr.length
// for (let i = 0; i < len; i++) {
//   console.log(pq.deleteMax())
// }
// console.log(new maxPQ(arr))

let N = 1000
const indexMinPQ = new IndexMinPQ(6)
for (let i = 0; i < 6; i++) {
  indexMinPQ.insert(i, arr[i])
}
console.log(indexMinPQ)
for (let i = 0; i < 6; i++) {
  console.log(indexMinPQ.deleteMin())
}
console.log(indexMinPQ)
// console.log(indexMinPQ.deleteMin())