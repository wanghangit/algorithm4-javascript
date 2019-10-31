const BST = require("../BST");
const AVLTree = require("../AVLTree");
const RedBlackTree = require("../RedBlackTree")
const { swap } = require("../../util");

// 初始化测试数据
let N = 5000;
let arr = [];
for (let i = 0; i < N; i++) {
  arr[i] = i;
}
// 打乱数组顺序
// for (let i = 0; i < N; i++) {
//   const pos = Math.floor(Math.random() * N);
//   swap(arr, i, pos);
// }
function runTest(search) {
  console.time(search.name + " :add");
  for (let i = 0; i < N; i++) {
    search.add(arr[i], arr[i]);
  }
  console.timeEnd(search.name + " :add");
  // console.time(search.name + " :delete");
  // for (let i = 0; i < N; i++) {
  //   search.delete(Math.floor(Math.random() * N));
  // }
  // console.timeEnd(search.name + " :delete");
  console.time(search.name + " :get");
  let res;
  for (let i = 0; i < N; i++) {
    res = search.get(i);
  }
  console.timeEnd(search.name + " :get");
}

runTest(new BST());
runTest(new AVLTree());
runTest(new RedBlackTree());
