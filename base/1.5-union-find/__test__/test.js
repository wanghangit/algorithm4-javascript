const quickFind = require("../quick-find");
const QuickUnion = require("../quick-union");
const WeightQuickUnion = require("../weight-quick-union")

const num = 10000; // 并查集的元素个数
const unionNum = 2000; // 并查集的交换次数

/**
 * 比较3种并查集的效率可以看到quick-union实现的都要远快于quick-find这种
 * 理论上来说应该是加权的并查集效率更高，但从测试数据看相差不多，我想是因为多维护了一个size导致的
 * @param {*} union 
 * @param {*} num 
 * @param {*} unionNum 
 */
function runTest(union, num, unionNum) {
  console.time(union.name);
  for (let i = 0; i < unionNum; i++) {
    let a = Math.floor(Math.random() * num),
      b = Math.floor(Math.random() * num);
    // console.log(a,b)
    // console.log(union)
    union.union(a, b);
  }
  console.timeEnd(union.name);
}

/**校验逻辑 */
const union = new quickFind(num);
runTest(union, num, unionNum);

const quickUnion = new QuickUnion(num);
runTest(quickUnion, num, unionNum);

const weightQuickUnion = new WeightQuickUnion(num)
runTest(weightQuickUnion, num, unionNum);




